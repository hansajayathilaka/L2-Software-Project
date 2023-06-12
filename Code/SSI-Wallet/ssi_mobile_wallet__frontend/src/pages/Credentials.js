import React, {useEffect, useState} from "react";
import {View, FlatList, Alert} from "react-native";
import {Button, Card, Avatar, DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import {useSelector} from 'react-redux';
import getCredentials from "../service/get-credentials";

export default function Credentials() {
    const [credentials, setCredentials] = useState([]);
    const [responseCheck, setResponseCheck] = useState({});
    const [last_credential_ex_id, setLast_credential_ex_id] = useState("");
    const {ConnectionID} = useSelector(state => {
        return state
    });

    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(37, 139, 214)', // Set the primary color to blue
      },
    };

    useEffect(() => {
        getCredentials().then((response) => {
            setCredentials(response.results);
            setLast_credential_ex_id(response.results[0].credential_exchange_id);
        });
    }, [ConnectionID]);

    const renderItem = ({item}) => (
      <PaperProvider theme={theme}>
        <Card style={{margin: 10, fontWeight: "bold"}}>
            <Card.Content>
                <Card.Title
                    title={item.attrs.time}
                    subtitle={item.attrs.fname}
                    left={(props) => (
                      <Avatar.Icon {...props} icon="star" color={theme.colors.primary} />
                    )}
                />
            </Card.Content>
        </Card>
      </PaperProvider>
    );
// issue date
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