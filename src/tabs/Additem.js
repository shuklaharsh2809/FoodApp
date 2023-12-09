import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native'; //LIBRARY THAT GIVES ANDROID PERMISSSION
import storage from '@react-native-firebase/storage'; //Library to store image
import firestore from '@react-native-firebase/firestore';
const Additem = () => {
  const [imageData, setImageData] = useState(null); //To save image
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const requestCameraPermission = async () => {
    // CODE TO GIVE PERMISSION TO CAMERA
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        OpenGallery(); //method is called here
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const OpenGallery = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (result.didCancel) {
        // Handle cancel action if needed
      } else {
        console.log(result);
        setImageData(result);
      }
    } catch (error) {
      console.error('Error opening the camera:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  //Method is made to upload image
  const uploadImage = async () => {
    if (imageData && imageData.assets && imageData.assets.length > 0) {
      const reference = storage().ref(imageData.assets[0].fileName);
      const pathToFile = imageData.assets[0].uri;

      try {
        await reference.putFile(pathToFile);
        const url = await storage().ref(reference.fullPath).getDownloadURL();
        console.log(url);
        setImageUrl(url);
        uploadItem(url);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle the error, e.g., display an error message to the user
      }
    } else {
      console.warn('No image selected');
    }
  };

  //To store data in the data base we use this
  const uploadItem = url => {
    firestore()
      .collection('items')
      .add({
        name: name,
        price: price,
        discountPrice: discountPrice,
        imageUrl: url,
        description: description,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Item</Text>
        </View>

        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}} //Image wii be seen here after uploading it
            style={styles.imageStyle}
          />
        ) : null}
        <TextInput
          placeholder="Enter item name"
          style={styles.inputStyle}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Enter item Price"
          style={styles.inputStyle}
          value={price} // Convert the value to a string
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Enter item Discount Price"
          style={styles.inputStyle}
          value={discountPrice} // Convert the value to a string
          onChangeText={text => setDiscountPrice(text)}
        />
        <TextInput
          placeholder="Enter item Description"
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          placeholder="Enter item Image URL"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <Text style={{alignSelf: 'center', marginTop: 10, fontWeight: '700'}}>
          OR
        </Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text>Pick Image from gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            uploadImage();
          }}>
          <Text style={{color: 'black'}}>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Additem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  uploadBtn: {
    backgroundColor: 'skyblue',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  imageStyle: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
