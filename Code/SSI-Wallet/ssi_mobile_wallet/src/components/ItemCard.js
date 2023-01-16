import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

const ItemCard = (props) => {
    return (
      <TouchableOpacity onPress={() => console.log('Item card pressed')}>
        <Card
          containerStyle={styles.cardContainer}
          image={{ uri: props.image }}
          imageStyle={styles.cardImage}
        >
          <Text style={styles.cardTitle}>{props.name}</Text>
          <Text style={styles.cardDescription}>{props.description}</Text>
          <Button
            title="Learn More"
            buttonStyle={styles.cardButton}
            onPress={() => console.log('Learn more button pressed')}
          />
        </Card>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
cardContainer: {
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden'
},
cardImage: {
    height: 150,
    width: '100%'
},
cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16
},
cardDescription: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 16
},
cardButton: {
    backgroundColor: '#3D6DCC',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16
    }
});

export default ItemCard;