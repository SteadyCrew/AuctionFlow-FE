import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // useNavigation import

const Header = () => {
  const navigation = useNavigation(); // useNavigation을 사용하여 navigation 가져오기

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logo}>A FLOW</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Note')}>
          <Icon name="notifications-outline" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconMargin} onPress={() => navigation.navigate('Search')}>
          <Icon name="search-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    // borderBottomColor:'#000',
    // borderBottomWidth:1
  },
  logo: {
    fontSize: 22,
    color: '#5DADE2',
    fontFamily: 'Pretendard-ExtraBold',
    letterSpacing: -1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    paddingLeft: 24,
  },
});

export default Header;
