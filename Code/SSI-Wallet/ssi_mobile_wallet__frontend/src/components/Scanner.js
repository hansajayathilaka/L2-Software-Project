import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet, Button, Alert} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import base64 from 'react-native-base64';
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UPDATE_CONNECTION_ID} from "../reducers/actions";

const Scanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [decodedString, setDecodedString] = useState('');
    const [connectionID, setConnectionID] = useState(''); // connection ID

    const dispatch = useDispatch()

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);


    // to decode the base 64 string
    const decodeBase64 = (encodedString) => {
        const decodedBytes = base64.decode(encodedString);
        const decodedString = decodedBytes.toString('utf-8');
        setDecodedString(decodedString);
        return decodedString;
    };

    // validation of the bar code and filter the input url from the QR code
    const handleBarCodeScanned = async ({type, data}) => {
        try {
            setScanned(true);
            const regex = /c_i=([^&]+)/;
            const match = regex.exec(data);
            const encodedValue = match ? match[1] : null;

            const base64_encodedValue = decodeBase64(encodedValue);
            console.log(base64_encodedValue);

            axios.post('https://holder-admin-agent.hansajayathilaka.com/connections/receive-invitation', base64_encodedValue)
                .then(response => {
                    // Handle the successful response
                    console.log(response.data);
                    console.log(response.data.connection_id);
                    dispatch({type: UPDATE_CONNECTION_ID, payload: response.data.connection_id});
                    Alert.alert(
                        'Connection Established',
                        'Between wallet and Issuer. Go to Connections and Check...',
                        [
                            {
                                text: 'Ok',
                                style: 'cancel',
                            },
                        ]
                    );
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });
        } catch (error) {
            Alert.alert('Invalid QR code');
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        margin: 10,
    },
});

export default Scanner;