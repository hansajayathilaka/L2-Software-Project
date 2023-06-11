import axios from "axios";

const storeCredentials = async (credentialExchangeId) => {
    try {
        const response = await axios.post(`https://holder-admin-agent.hansajayathilaka.com/issue-credential/records/${credentialExchangeId}/store`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}


export default storeCredentials;
