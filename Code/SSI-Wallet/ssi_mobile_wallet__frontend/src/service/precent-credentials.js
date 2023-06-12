const prescentCredentials = async (presentation_exchange_id) => {
    try {
        const data = {
            "requested_attributes": {
                "email": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
                "fname": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
                "lname": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
                "nic": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
                "sex": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
                "img": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
                "wallet_address": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
                "time": {
                  "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "revealed": true
                },
            },
            "requested_predicates": {},
            "self_attested_attributes": {},
            "trace": false
          }
        const response = await axios.post(`https://holder-admin-agent.hansajayathilaka.com/present-proof/records/${presentation_exchange_id}/send-presentation`, data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        alert(error);
    }
}