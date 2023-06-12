import axios from "axios";

const acceptCredentialOffer = async (credentialExchangeId) => {
    try {
        const response = await axios.post(`https://holder-admin-agent.hansajayathilaka.com/issue-credential/records/${credentialExchangeId}/send-request`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export default acceptCredentialOffer;