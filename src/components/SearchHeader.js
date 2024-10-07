import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

function SearchHeader() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleCancel = () => {
    setSearchTerm(''); // 검색어 초기화
    navigation.goBack(); // 뒤로가기
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>
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
  searchInput: {
    flex: 1,
    backgroundColor: '#F6F6F6', // 배경색
    borderWidth: 0, // 테두리 제거
    borderRadius: 20, // 모서리 둥글게 (40 -> 20으로 조정)
    paddingVertical: 0, // 수직 여백 줄이기
    paddingHorizontal: 12,
    height: 36, // 고정된 높이
    fontFamily: 'Pretendard-Regular',
  },
  cancelButton: {
    marginLeft: 10, // 아이콘과 버튼 간격 조정
  },
  cancelButtonText: {
    color: '#909090', // 취소 버튼 색상
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});

export default SearchHeader;
