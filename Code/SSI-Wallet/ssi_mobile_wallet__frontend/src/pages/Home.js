import React, {useEffect, useRef, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Avatar, Button, Card, RadioButton} from "react-native-paper";
import acceptCredentialOffer from "../service/send-request";
import axios from 'axios';
import storeCredentials from "../service/store-credentials";
import {UPDATE_CONNECTION_ID} from "../reducers/actions";
import {getConnectionID} from "../utils/connectionIdManage";
import {useDispatch, useSelector} from "react-redux";
import getCredentials from "../service/get-credentials";
import prescentCredentials from "../service/precent-credentials";

const Home = ({navigation}) => {
    const {ConnectionID} = useSelector(state => state);
    const [credentialList, setCredentialList] = useState([]);
    const [presExchangeId, setPresExchangeId] = useState(false);
    const [selectCredential, setSelectCredential] = useState(null);
    const isCredentialProcessing = useRef(false);
    const dispatch = useDispatch();
    let issueInterval = null;
    let presentInterval = null;

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
        if (issueInterval !== null) {
            clearInterval(issueInterval);
        }
        (async () => {
            issueInterval = setInterval(async () => {
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
                    Alert.alert("Error", JSON.stringify(error));
                }
            }, 5000);
        })();
        return () => clearInterval(issueInterval);
    }, []);

    // Access present-proof/records API every 5 seconds
    useEffect(() => {
        if (presentInterval !== null) {
            clearInterval(presentInterval);
        }
        (async () => {
            presentInterval = setInterval(async () => {
                console.log('present-proof/records');
                if (isCredentialProcessing.current === false) {
                    try {
                        const response3 = await axios.get("https://holder-admin-agent.hansajayathilaka.com/present-proof/records");
                        await response3.data.results.forEach((result) => {
                            console.log('storing response: ' + result.state);
                            switch (result.state) {
                                case 'request_received':
                                    // Send Presentation
                                    if (isCredentialProcessing.current === false) {
                                        console.log(result.presentation_exchange_id);
                                        Alert.alert('Presentation Request Received', result.presentation_exchange_id);
                                        setPresExchangeId(result.presentation_exchange_id);
                                        isCredentialProcessing.current = true;
                                        getCredentials().then((credentials) => {
                                            console.log(credentials);
                                            const tempCredentials = [];
                                            for(let credential of credentials) {
                                                if(credential.schema_id === "TduHMBiPVkFvrLhwZteMUn:2:ssi-person:0.0.6") {
                                                    tempCredentials.push(credential);
                                                }
                                            }
                                            setCredentialList(tempCredentials);
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
                        Alert.alert("Error", JSON.stringify(error));
                    }
                }
            }, 5000);
        })();
        return () => clearInterval(presentInterval);
    }, []);

    // for the verification 

    // const credentialCardRadioButtonList = () => {
    //     return (
    //         <View>
    //             <RadioButton.Group onValueChange={value => setSelectCredential(value)}>
    //                 <View style={{flexDirection: "row"}}>
    //                     <Text style={{fontSize: 15}}>Select Credential</Text>
    //                     {
    //                         credentialList.map((credential) => {
    //                             console.log(credential);
    //                             return (
    //                                 <View>
    //                                     <Text>asdf</Text>
    //                                     <RadioButton value={credential.referent} />
    //                                 </View>
    //                             );
    //                         })
    //                     }
    //                 </View>
    //             </RadioButton.Group>
    //         </View>
    //     );
    // }


    const onClickPrescentCredentials = async (event) => {
        debugger;
        prescentCredentials(presExchangeId, selectCredential).then((response) => {
            debugger;
            console.log(response);
            Alert.alert('Presentation Sent');
            isCredentialProcessing.current = false;
            setSelectCredential(false);
            setCredentialList([]);
            setPresExchangeId(false);
        })
    }
    

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{marginHorizontal: 20,}}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    {/*<Text>credentialList: {JSON.stringify(credentialList)}</Text>*/}
                    {/*<Text>presExchangeId: {presExchangeId }</Text>*/}
                    {/*<Text>selectCredential: {selectCredential  === false ? "false" : selectCredential}</Text>*/}
                    {/*<Text>ConnectionID: {JSON.stringify(ConnectionID)}</Text>*/}
                    {/*<Text>isCredentialProcessing: {isCredentialProcessing.current === true ? "true" : "false"}</Text>*/}
                    {
                        isCredentialProcessing.current ?
                            <View>
                                <View>
                                    <RadioButton.Group onValueChange={value => {
                                        console.log(value);
                                        setSelectCredential(value);
                                    }} value={selectCredential}>
                                        <View>
                                            <Text style={{fontSize: 15}}>Select Credential</Text>
                                            <View>
                                                {
                                                    credentialList.map((credential) => {
                                                        console.log(credential);
                                                        return (
                                                            <View key={credential.referent}>
                                                                <RadioButton value={credential.referent} />
                                                                <Card style={{margin: 10, fontWeight: "bold"}}>
                                                                    <Card.Content>
                                                                        <Card.Title
                                                                            title={credential.time}
                                                                            subtitle={credential.fname}
                                                                            left={(props) => (
                                                                                <Avatar.Icon {...props} icon="star" />
                                                                            )}
                                                                        />
                                                                    </Card.Content>
                                                                </Card>
                                                            </View>
                                                        );
                                                    })
                                                }
                                            </View>

                                        </View>
                                    </RadioButton.Group>
                                </View>
                                <Button onPress={onClickPrescentCredentials}>Present Credential</Button>
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
