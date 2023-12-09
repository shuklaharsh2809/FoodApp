import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = async () => {
    try {
      const users = await firestore().collection('admin').get();
      const adminData = users.docs[0].data();
      if (email === adminData.email && password === adminData.password) {
        await AsyncStorage.setItem('EMAIL', email);
        navigation.navigate('Dashboard');
      } else {
        alert('Wrong email/pass');
      }
    } catch (error) {
      console.error('Error while logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email Id"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
        secureTextEntry={true} // To hide the password input
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Please Enter data');
          }
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    marginBottom: 20,
  },
  inputStyle: {
    paddingLeft: 15,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
    marginBottom: 10,
  },
  loginBtn: {
    backgroundColor: 'skyblue',
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});
