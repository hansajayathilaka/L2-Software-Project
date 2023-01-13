import React from 'react';

const Credential = () => {
    return (
        <View>
            <Text>Credentials page</Text>
            <Button title="go back to signUp" onPress={() => props.navigate('Home')} />
        </View>
    )
}

export default Credential;