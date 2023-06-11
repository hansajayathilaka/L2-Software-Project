import React, {useEffect} from 'react';
import {View, Alert} from "react-native";
import {Button, FAB} from "react-native-paper";
import Scanner from "../components/Scanner";
import {ScannerPage} from "./ScannerPage";
import acceptCredentialOffer from "../service/send-request";
import axios from 'axios';
import storeCredentials from "../service/store-credentials";
import {UPDATE_CONNECTION_ID} from "../reducers/actions";
import {getConnectionID} from "../utils/connectionIdManage";
import {useDispatch, useSelector} from "react-redux";

const Home = ({navigation}) => {
    const [active, setActive] = React.useState("");
    const dispatch = useDispatch();
    const {ConnectionID} = useSelector(state => state);

    useEffect(() => {
        (async () => {
            if (ConnectionID === undefined) {
                debugger;
                const val = await getConnectionID();
                if (val === undefined) {
                    dispatch({
                        type: UPDATE_CONNECTION_ID,
                        payload: [],
                    });
                } else {
                    dispatch({
                        type: UPDATE_CONNECTION_ID,
                        payload: val,
                    });
                }

            }
        })()
    }, []);

    useEffect(() => {
        let interval;
        (async () => {
            interval = setInterval(async () => {
                console.log("asdf");
                try {
                    const response3 = await axios.get("https://holder-admin-agent.hansajayathilaka.com/issue-credential/records");
                    console.log('storing response: ');
                    console.log(response3.data);
                    await response3.data.results.forEach((result) => {
                        console.log('storing response: ' + result.state);
                        switch (result.state) {
                            case 'offer_received':
                                // Credential Offer Received
                                acceptCredentialOffer(result.credential_exchange_id).then((response) => {
                                    console.log(response);
                                    Alert.alert('Credential Offer Accepted');
                                });
                                break;
                            case 'credential_received':
                                // Store Credential
                                storeCredentials(result.credential_exchange_id).then((response) => {
                                    console.log(response);
                                    Alert.alert('Credential Stored');
                                });
                                break;
                            default:
                                Alert.alert('storing response: ' + result.state);
                                break;
                        }
                    });
                } catch (error) {
                    console.log(error);
                    Alert.alert(error);
                }
            }, 5000);
        })();
        return () => clearInterval(interval);
    }, []);


    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Button
                icon="qrcode-scan"
                mode="contained"
                onPress={() => navigation.navigate("ScannerPage")}
                style={{marginTop: 10, fontWeight: "bold"}}
                buttonColor="rgb(37, 139, 214)"
                textColor="white"
            >
                QR Scanner
            </Button>
        </View>
    );

    const styles = StyleSheet.create({
        fab: {
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
        },
    });
};

export default Home;
