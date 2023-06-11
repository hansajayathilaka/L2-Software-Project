import React, {useEffect, useState} from "react";
import {View, FlatList, Alert} from "react-native";
import {Button, Card, Avatar} from "react-native-paper";
import {useSelector} from 'react-redux';
import getCredentials from "../service/get-credentials";

export default function Credentials() {
    const [credentials, setCredentials] = useState([]);
    const [responseCheck, setResponseCheck] = useState({});
    const [last_credential_ex_id, setLast_credential_ex_id] = useState("");
    const {ConnectionID} = useSelector(state => {
        return state
    });

    useEffect(() => {
        getCredentials().then((response) => {
            for(let i = 0; i < response.results.length; i++) {
                debugger
            }
            setCredentials(response.results);
            setLast_credential_ex_id(response.results[0].credential_exchange_id);
        });
    }, [ConnectionID]);

    const renderItem = ({item}) => (
        <Card style={{margin: 10, fontWeight: "bold"}}>
            <Card.Content>
                <Card.Title
                    title={item.their_label}
                    subtitle={item.created_at}
                    left={(props) => <Avatar.Icon {...props} icon="card"/>}
                />
            </Card.Content>
        </Card>
    );

    return (
        <View>
            {/*<Button*/}
            {/*    icon="reload"*/}
            {/*    onPress={loadCredentials}*/}
            {/*    style={{margin: 10, fontWeight: "bold"}}*/}
            {/*    buttonColor="rgb(37, 139, 214)"*/}
            {/*    textColor="white"*/}
            {/*>*/}
            {/*    Refresh*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    icon="reload"*/}
            {/*    onPress={letNewCredentialsIn}*/}
            {/*    style={{margin: 10, fontWeight: "bold"}}*/}
            {/*    buttonColor="rgb(37, 139, 214)"*/}
            {/*    textColor="white"*/}
            {/*>*/}
            {/*    Let New Credentials In*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    icon="reload"*/}
            {/*    onPress={finalRequest}*/}
            {/*    style={{margin: 10, fontWeight: "bold"}}*/}
            {/*    buttonColor="rgb(37, 139, 214)"*/}
            {/*    textColor="white"*/}
            {/*>*/}
            {/*    finalRequest*/}
            {/*</Button>*/}
            <FlatList
                data={credentials}
                keyExtractor={(item) => item.referent}
                renderItem={renderItem}
            />
        </View>
    );
}
