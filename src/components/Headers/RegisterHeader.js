import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

function RegisterHeader() {
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.goBack(); // 뒤로 가기
  };

  const handleRegister = () => {
    // 등록 로직 추가
    console.log("등록 버튼 클릭");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleCancel}>
        <Icon name="close-outline" size={30} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerButton}>등 록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 버튼과 제목을 양쪽으로 배치
    alignItems: 'center',
    paddingVertical: 18, // `Header`와 동일한 패딩 값 적용
    paddingHorizontal: 24, // `Header`와 동일한 패딩 값 적용
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#5DADE2', // 배경색
    color: '#fff', // 텍스트 색상
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    paddingHorizontal: 16, // 좌우 여백
    borderRadius: 20, // 둥근 모서리
    height: 30, // 고정된 높이
    lineHeight: 30, // 텍스트가 수직 중앙에 위치하게 하기 위한 lineHeight
    textAlign: 'center', // 텍스트 중앙 정렬
  }
});

export default RegisterHeader;
