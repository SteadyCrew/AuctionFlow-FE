import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchHeader = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      navigation.navigate('SearchResult', { searchTerm }); // 검색어를 결과 화면으로 전달
    }
  };

  const handleCancel = () => {
    setSearchTerm('');
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch} // Enter 키로 검색
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>
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
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderWidth: 0,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 12,
    height: 36,
    fontFamily: 'Pretendard-Regular',
  },
  cancelButton: {
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#909090',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});

export default SearchHeader;
