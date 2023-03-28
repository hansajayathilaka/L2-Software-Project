import { View, Text, StyleSheet } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    backgroundColor: '#85b7fe',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
});



export default Card;