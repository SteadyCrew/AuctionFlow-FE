import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

function NoteHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>알림</Text>
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
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  headerTitle: {
    marginBottom:5,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#000',
    marginLeft: 12, // 왼쪽 아이콘과 간격 조정
    marginRight: 'auto', // 오른쪽 아이콘과 멀어지도록 설정
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    paddingLeft: 24,
  },
});

export default NoteHeader;
