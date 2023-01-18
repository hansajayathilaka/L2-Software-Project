import React from 'react';
import { Button, Icon } from 'react-native-elements';

const RoundScannerButton = () => {

    return (
        <Button
        icon={
            <Icon
            name='scanner'
            size={25}
            color='black'
            />
        }
        buttonStyle={{
            backgroundColor: 'white',
            borderRadius: 50,
            width: 50,
            height: 50,
            borderColor: 'black',
            borderWidth: 1,
            elevation: 5, // for android
            shadowOpacity: 0.5, // for ios
            shadowRadius: 5, // for ios
            shadowOffset: { width: 0, height: 2 }, // for ios
        }}
        />
    );
};

export default RoundScannerButton;
