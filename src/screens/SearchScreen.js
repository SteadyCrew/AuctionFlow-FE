import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SearchScreen() {
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
    <View style={styles.container}>
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

        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>키워드를 입력해 원하는 상품을 찾아보세요!</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  searchContainer: {
    flex: 1,
    alignItems: 'center', // 수평 중앙 정렬
    backgroundColor: '#fff',
  },
  searchText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default SearchScreen;
