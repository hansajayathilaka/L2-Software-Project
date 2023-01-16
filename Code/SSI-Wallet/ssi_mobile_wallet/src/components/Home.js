import React from 'react';

const Home = () => {
    return (
        <View>
            <Text>Home page</Text>
            <Button title="go back to credentials" onPress={() => this.props.navigate('Credentials')} />
        </View>
    )
}

export default Home;