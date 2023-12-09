import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import Header from '../../Common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let userId = '';
const Main = () => {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // const subscriber =
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getCartItems();
    };

    fetchData();
  }, [isFocused]);

  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data.cart.length);
  };
  const onAddtoCart = async (item, index) => {
    const user = await firestore().collection('users').doc(userId).get();
    console.log(user._data.cart);
    let tempDart = user._data.cart || []; // Ensure tempDart is initialized as an array

    let existingItem = tempDart.find(itm => itm.id === item.id);

    if (existingItem) {
      existingItem.data.qty = (existingItem.data.qty || 0) + 1; // Increment qty if it exists, otherwise initialize with 1
    } else {
      tempDart.push({...item, data: {...item.data, qty: 1}}); // Add new item with qty initialized to 1
    }

    await firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });

    getCartItems();
  };

  return (
    <View style={styles.container}>
      <Header
        title={'FoodApp'}
        icon={require('../../../images/cart.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <FlatList
        data={items}
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
              <View>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => {
                    onAddtoCart(item, index);
                  }}>
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

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
    height: 120, // Increased height for better spacing
    marginBottom: 10,
    padding: 10, // Added padding for better spacing
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
  nameView: {
    flex: 1,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
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
    color: 'gray',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50', // Green color
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 10,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 14, // Adjusted text size
    fontWeight: 'bold',
  },
});

export default Main;
