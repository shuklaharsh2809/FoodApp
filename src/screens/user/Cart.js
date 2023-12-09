import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
let userId = '';
const Cart = ({navigation}) => {
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    getCartItems();
  }, [isFocused]);
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartList(user._data.cart);
  };
  const addItem = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty + 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  const removeItem = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty - 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  const deleteItem = async index => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.splice(index, 1);
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  const getTotal = () => {
    let total = 0;
    cartList.map(item => {
      total = total + item.data.qty * item.data.discountPrice;
    });
    return total;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={cartList}
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
              <View style={styles.addRemoveView}>
                <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    },
                  ]}
                  onPress={() => {
                    if (item.data.qty > 1) {
                      removeItem(item);
                    } else {
                      deleteItem(index);
                    }
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{fontSize: 15, fontWeight: '600'}}>
                  {item.data.qty}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    },
                  ]}
                  onPress={() => {
                    addItem(item);
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <Text style={{color: '#000', fontWeight: '600'}}>
            {'Items(' + cartList.length + ')\nTotal: $' + getTotal()}
          </Text>
          <TouchableOpacity
            style={[
              styles.addToCartBtn,
              {
                width: 100,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Text style={{color: 'black'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;
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
  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartBtn: {
    backgroundColor: 'skyblue',
    padding: 9,
    borderRadius: 15,
  },
  checkoutView: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
