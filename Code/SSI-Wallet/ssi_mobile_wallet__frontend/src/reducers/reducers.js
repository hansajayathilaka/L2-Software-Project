import AsyncStorage from "@react-native-async-storage/async-storage";

const initState = {
    ConnectionID: ''
}

// store the password in the asynch storage
const setConnectionID = async (key, value) => {
    try {
      AsyncStorage.setItem(key , value);
      console.log("saved the data" + value);
      // resetForm();
      // navigation.navigate("SignIn", { name: "Upeksha" });
    } catch (e) {
      alert("Error occured while signup");
    }
  };

  // retrieve connection ID from the asynch storage
  const getConnectionID = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        console.log("value is " + value);
        return value;
      }
    } catch (e) {
      // error reading value
      console.log("error occured while getting the value");
    }
  };

export const reducer = (state=initState, action) => {
    console.log('Res ', action)
    switch (action.type){
        case 'CONNECTION_ID':
            const previousConnectionIDs = getConnectionID("@connectionID");
            const currentConnectionIDs = previousConnectionIDs + ',' + action.payload;
            setConnectionID("@connectionID", currentConnectionIDs); // store the connection ids in the asynch storage
            state = { ...state, ConnectionID: action.payload } // store the last connection id in the store
            break;
    }

    return state
}
