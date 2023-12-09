import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';

const LanguageModal = ({
  langModalVisible,
  setLangModalVisible,
  onSelectLang,
}) => {
  const {height, width} = Dimensions.get('window');

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,.5)',
    },
    modalView: {
      margin: 20,
      width: width - 20, // Adjusted based on your requirement
      //height: height / 2,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
    languageItem: {
      width: '90%',
      height: 50,
      borderRadius: 10,
      borderWidth: 0.5,
      marginTop: 10,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
    },
    btns: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
  });
  const [selectedLang, setSelectedLang] = useState(0);
  const [language, setLanguage] = useState([
    {name: 'English', selected: true},
    {name: 'हिंदी', selected: false},
    {name: 'ਪੰਜਾਬੀ', selected: false},
    {name: 'தமிழ்', selected: false},
    {name: 'اردو', selected: false},
  ]);
  const onSelect = index => {
    setLanguage(prevLanguage => {
      const temp = [...prevLanguage]; // Create a shallow copy
      temp.forEach((item, ind) => {
        if (index === ind) {
          item.selected = !item.selected; // Toggle the selected state
          setSelectedLang(index);
        } else {
          item.selected = false; // Deselect other items
        }
      });
      return temp; // Return the new array
    });
  };

  // let temp2 = [];
  // temp.map(item => {
  //   temp2.push();
  // });
  // setLanguage(temp2);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={langModalVisible}
      onRequestClose={() => {
        setLangModalVisible(!langModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Language</Text>
          <View style={{width: '100%'}}>
            <FlatList
              data={language}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.languageItem,
                      {
                        borderColor:
                          item.selected == true ? 'skyblue' : 'black',
                      },
                    ]}
                    onPress={() => {
                      onSelect(index);
                    }}>
                    {item.selected == true ? (
                      <Image
                        source={require('../../images/selected.png')}
                        style={[styles.icon, {tintColor: 'skyblue'}]}
                      />
                    ) : (
                      <Image
                        source={require('../../images/non_selected.png')}
                        style={styles.icon}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 18,
                        color: item.selected == true ? 'skyblue' : 'black',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={{
                width: '40%',
                height: 50,
                borderWidth: 0.5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setLangModalVisible(false);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '40%',
                height: 50,
                borderWidth: 0.5,
                borderRadius: 10,
                backgroundColor: 'skyblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setLangModalVisible(false);
                onSelectLang(selectedLang);
              }}>
              <Text style={{color: 'black'}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;