import {Alert} from "react-native";
import axios from "axios";

const prescentCredentials = async (presentation_exchange_id, cred_id) => {
    debugger
    try {
        const data = {
            "requested_attributes": {
                "email": {
                  "cred_id": cred_id,
                  "revealed": true
                },
                "fname": {
                  "cred_id": cred_id,
                  "revealed": true
                },
                "lname": {
                  "cred_id": cred_id,
                  "revealed": true
                },
                "nic": {
                  "cred_id": cred_id,
                  "revealed": true
                },
                "sex": {
                  "cred_id": cred_id,
                  "revealed": true
                },
                "img": {
                  "cred_id": cred_id,
                  "revealed": true
                },
                "wallet_address": {
                  "cred_id": cred_id,
                  "revealed": true
                },
                "time": {
                  "cred_id": cred_id,
                  "revealed": true
                },
            },
            "requested_predicates": {},
            "self_attested_attributes": {},
            "trace": false
          }
        const response = await axios.post(`https://holder-admin-agent.hansajayathilaka.com/present-proof/records/${presentation_exchange_id}/send-presentation`, data);
        debugger;
        console.log(response.data);
    } catch (error) {
        debugger
        console.error(error);
        Alert.alert("Error", JSON.stringify(error));
    }
}

export default prescentCredentials;
