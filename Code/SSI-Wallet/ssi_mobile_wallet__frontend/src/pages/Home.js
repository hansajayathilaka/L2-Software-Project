import React, {useEffect} from 'react';
import {View, Alert, Text} from "react-native";
import {Button, FAB} from "react-native-paper";
import acceptCredentialOffer from "../service/send-request";
import axios from 'axios';
import storeCredentials from "../service/store-credentials";
import {UPDATE_CONNECTION_ID} from "../reducers/actions";
import {getConnectionID} from "../utils/connectionIdManage";
import {useDispatch, useSelector} from "react-redux";
import { RadioButton } from 'react-native-paper';
import getCredentials from "../service/get-credentials";

const Home = ({navigation}) => {
    const [active, setActive] = React.useState("");
    const dispatch = useDispatch();
    const {ConnectionID} = useSelector(state => state);
    const [credentialList, setCredentialList] = React.useState([]);
    const [presExchId, setPresExchId] = React.useState(false);
    const [selectCredential, setSelectCredential] = React.useState(false);

    useEffect(() => {
        (async () => {
            if (ConnectionID === undefined) {
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

    // Access issue-credential/records API every 5 seconds
    useEffect(() => {
        let interval;
        (async () => {
            interval = setInterval(async () => {
                console.log('issue-credential/records');
                try {
                    const response3 = await axios.get("https://holder-admin-agent.hansajayathilaka.com/issue-credential/records");
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

    // Access present-proof/records API every 5 seconds
    useEffect(() => {
        setPresExchId(true);
        let interval;
        (async () => {
            interval = setInterval(async () => {
                console.log('present-proof/records');
                try {
                    const response3 = await axios.get("https://holder-admin-agent.hansajayathilaka.com/present-proof/records");
                    await response3.data.results.forEach((result) => {
                        console.log('storing response: ' + result.state);
                        switch (result.state) {
                            case 'request_received':
                                // Send Presentation
                                if (presExchId === false) {
                                    console.log(result.presentation_exchange_id);
                                    setPresExchId(result.presentation_exchange_id);
                                    getCredentials().then((response) => {
                                        setCredentialList(response.data.results);
                                    });
                                }
                                break;
                            case 'presentation_acked':
                                // storeCredentials(result.credential_exchange_id).then((response) => {
                                //     console.log(response);
                                //     Alert.alert('Credential Stored');
                                // });
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

    // for the verification 

    const credentialCardRadioButtonList = () => {
        return (
            <View>
                <RadioButton.Group onValueChange={value => setSelectCredential(value)}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{fontSize: 15}}>Select Credential</Text>
                        {
                            credentialList.map((credential) => {
                                return (
                                    <View>
                                        <Text>asdf</Text>
                                        <RadioButton value={credential.referent} />
                                    </View>
                                );
                            })
                        }
                    </View>
                </RadioButton.Group>
            </View>
        );
    }


    const onClickPrescentCredentials = async (event) => {
        debugger;
        const cred_id = selectCredential;
        prescentCredentials(presExchId, ).then((response) => {
            console.log(response);
            Alert.alert('Presentation Sent');
            // setPresExchId(false);
        })
    }
    

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            {
                presExchId ?
                    <View>
                        {credentialCardRadioButtonList()}
                        <Button onClick={onClickPrescentCredentials}>Present Credential</Button>
                    </View>
                    :
                    <></>
            }
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
};

export default Home;
