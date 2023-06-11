import axios from "axios";

const getCredentials = async () => {
    try {
        const response = await axios.get(`https://holder-admin-agent.hansajayathilaka.com/credentials`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getCredentials;
