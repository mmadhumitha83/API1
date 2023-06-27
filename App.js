import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.id}>ID: {item.id}</Text>
              <Text style={styles.email}>Email: {item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'black',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'purple'
  },
  id: {
    fontSize: 16,
    color: 'violet',
  },
  email: {
    fontSize: 25,
    color: 'pink',
  },
});