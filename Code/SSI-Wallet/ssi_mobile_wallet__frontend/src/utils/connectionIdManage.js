// store the password in the asynch storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const CONNECTION_ID_KEY = "@connectionID";

const setConnectionID = async (value) => {
    try {
        await AsyncStorage.setItem(CONNECTION_ID_KEY, JSON.stringify(value));
        console.log("saved the data" + value);
    } catch (e) {
        alert("Error occured while signup");
    }
};


// retrieve connection ID from the async storage
const getConnectionID = async () => {
    try {
        const value = await AsyncStorage.getItem(CONNECTION_ID_KEY);
        if (value !== null) {
            console.log("value is " + value);
            return JSON.parse(value);
        }
    } catch (e) {
        console.log("error occurred while getting the value");
    }
};

export {setConnectionID, getConnectionID};
