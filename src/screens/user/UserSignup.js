import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Loader from '../Common/Loader';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserSignup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const saveUser = () => {
    setModalVisible(true);
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
        cart: [],
      })
      .then(res => {
        // Set userId in AsyncStorage
        AsyncStorage.setItem('USERID', userId)
          .then(() => {
            setModalVisible(false);
            navigation.goBack();
          })
          .catch(error => {
            setModalVisible(false);
            console.log('Error setting USERID in AsyncStorage:', error);
          });
      })
      .catch(error => {
        setModalVisible(false);
        console.log('Error saving user data:', error);
      });
  };
  return (
    <View>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Name"
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email Id"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Mobile Number"
        keyboardType={'number-pad'}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (
            email !== '' &&
            password !== '' &&
            name !== '' &&
            mobile !== '' &&
            mobile.length > 9
          ) {
            saveUser();
          } else {
            alert('Please Enter data');
          }
          //setModalVisible(!modalVisible); to see whether modal is visible or not
        }}>
        <Text style={styles.btnText}>SignUp</Text>
      </TouchableOpacity>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default UserSignup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    marginTop: 30,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 15,
    height: 40,
    alignSelf: 'center',
    marginTop: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: 'skyblue',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});
