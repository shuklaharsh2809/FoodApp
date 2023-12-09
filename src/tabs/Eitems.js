import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const Eitems = () => {
  const isFocuesd = useIsFocused(); //State is made so that when we edit it will come back to edititems
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, [isFocuesd]);
  //To get added items
  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = []; //Array is defined
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            //Query is written push data
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
          setItems(tempData);
        });
      });
  };
  //Method to delte items on clicking Delete button
  const deleteItem = docId => {
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItems(); //Method is called to update the data
      });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={items} //How to get data from the data base
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemView}>
              <Image
                source={{uri: item.data.imageUrl}}
                style={styles.itemImage}
              />
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.descText}>{item.data.description}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {'$' + item.data.discountPrice}
                  </Text>
                  <Text style={styles.discountPrice}>
                    {'$' + item.data.price}
                  </Text>
                </View>
              </View>
              <View style={{margin: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditItem', {
                      //On clicking edit button navigating to edititem
                      data: item.data,
                      id: item.id,
                    });
                  }}>
                  <Image
                    source={require('../images/editing.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteItem(item.id);
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={[styles.icon, {marginTop: 20}]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Eitems;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '45%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'skyblue',
    fontWeight: '700',
  },
  discountPrice: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
