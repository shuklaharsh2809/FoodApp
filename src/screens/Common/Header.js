import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

const Header = ({title, icon, count, onClickIcon}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {icon && (
        <View>
          <TouchableOpacity
            onPress={() => {
              onClickIcon();
            }}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.count}>
            <Text style={{color: '#fff'}}>{count ? count : '0'}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: width,
    elevation: 5,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15, // Add paddingRight for spacing
    flexDirection: 'row', // Use row direction
    justifyContent: 'space-between', // Align items on the ends
    alignItems: 'center', // Align items vertically
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#347aeb',
  },
  icon: {
    width: 30,
    height: 24,
  },
  count: {
    backgroundColor: 'red',
    width: 16,
    height: 20,
    borderRadius: 25,
    position: 'absolute',
    top: -9,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
