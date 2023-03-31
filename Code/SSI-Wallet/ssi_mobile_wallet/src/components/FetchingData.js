import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const userURL = 'https://reactnative.dev/movies.json';

const ItemCard = (props) => {
    return (
      <TouchableOpacity onPress={() => console.log('Item card pressed')}>
        <View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{props.name}</Text>
            <Text style={styles.cardDescription}>{props.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

const FetchingData = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(userURL)
        .then((response) => response.json())
        .then((json) => setData(json.movies))
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView>
            {
            isLoading ? <ActivityIndicator /> : 
            <View>
                {data.map((item) => (
                    <ItemCard key={item.id} name={item.title} description={item.releaseYear} />
                ))}
            </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
      padding: 16
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    cardDescription: {
      fontSize: 14,
      color: 'gray'
    }
  });

export default FetchingData;