import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LanguageModal from '../Common/LanguageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectLogin = ({navigation}) => {
  const [langModalVisible, setLangModalVisible] = useState(false);
 // const [selectedLang, setSelectedLang] = useState(0);

  //const saveSelectedLang = async index => {
  //  await AsyncStorage.setItem('LANG', index);
 // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Login Type</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.btnText}>Admin Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('UserLogin');
        }}>
        <Text style={styles.btnText}>User Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectLanguageBtn}
        onPress={() => {
          setLangModalVisible(!langModalVisible);
        }}>
        <Text>Select Language</Text>
      </TouchableOpacity>
      <LanguageModal
        langModalVisible={langModalVisible}
        setLangModalVisible={setLangModalVisible}
        //onSelectLang={x => {
        //  setSelectedLang(x);
        //  saveSelectedLang(x);
       // }}
      />
    </View>
  );
};

export default SelectLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  btn: {
    backgroundColor: 'skyblue',
    height: 50,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  selectLanguageBtn: {
    width: '50%',
    height: 50,
    borderWidth: 0.2,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
