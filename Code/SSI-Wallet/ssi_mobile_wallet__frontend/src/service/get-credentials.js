import axios from "axios";

const getCredentials = async () => {
    try {
        const response = await axios.get(`https://holder-admin-agent.hansajayathilaka.com/credentials`);
        console.log(response.data.results);

        return response.data.results;
    } catch (error) {
        console.error(error);
    }
    return null
}

export default getCredentials;
