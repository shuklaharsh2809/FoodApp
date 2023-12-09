import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //navigation.navigate('SelectLogin');
      checkLogin();
    }, 3000);
  }, []);
  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('email');
    //console.log(email);
    if (email != null) {
      console.log(email);
      navigation.navigate('Home');
    } else {
      navigation.navigate('SelectLogin');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FoodHub</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red',
  },
});
export default Splash;
