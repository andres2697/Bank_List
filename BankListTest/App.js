import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, FlatList, View } from 'react-native';

const Item = ({ item }) => (
  <View key={item}>
    <Text style={{ color:"white", fontSize: 18}}>{item}</Text>
  </View>
);

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://dev.obtenmas.com/catom/api/challenge/banks')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View  style={styles.container}>
      <Text style={ styles.titleText }>Bank List</Text>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          style={styles.listContainer}
          data={data}
          renderItem={({item}) => <Item item={item.bankName} />}
          keyExtractor={item => item.bankName}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkcyan',
    padding: 50,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    flex: 1
  },
  listContentContainer: {
    flex: 1,
    alignItems: 'center', // Centra horizontalmente los elementos
  }
});
export default App;
