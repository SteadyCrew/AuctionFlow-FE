import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../components/Auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

const MypageScreen = () => {
  const { nickname, logOut, token } = useContext(AuthContext); // nickname, logOut, token 가져오기
  const [address, setAddress] = useState(null); // 주소 상태 관리
  const navigation = useNavigation(); // useNavigation 훅 사용

  // 배송지 정보를 서버에서 가져오는 함수
  const fetchAddress = async () => {
    try {
      const response = await fetch('http://3.35.1.149:8080/mypage/store/storeInfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // JWT 토큰 추가
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAddress(data); // 서버에서 받은 주소 정보 상태에 저장
      } else {
        Alert.alert('배송지 정보를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('주소 정보를 불러오는 데 오류가 발생했습니다.');
    }
  };

  // 컴포넌트가 마운트될 때 주소 정보 가져오기
  useEffect(() => {
    fetchAddress();
  }, [token]); // token이 변경될 때마다 호출

  const goToAddressEdit = () => {
    navigation.navigate('AddressScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://your-image-url.com/profile.jpg' }} // 프로필 사진 URL
          style={styles.profileImage}
        />
        <View style={styles.InfoContainer}>
          <Text style={styles.nickname}>
            {nickname} 님,
          </Text>
          <Text style={styles.greetings}>환영합니다!</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.payContainer}>
        <Text style={styles.sectionTitle}>결제수단 연결</Text>
        <Text style={styles.pay}>카카오페이 연동하기</Text>
      </View>

      {/* 배송지 */}
      <View style={styles.addressContainer}>
      <View style={styles.addressbutton}>
        <Text style={styles.sectionTitle}>배송지</Text>
        <TouchableOpacity onPress={goToAddressEdit}>
          <Text style={styles.editButton}>수정</Text>
        </TouchableOpacity>
      </View>
        {address ? (
          <Text style={styles.address}>
          {`${address.basicAddr} ${address.detailAddr}  (${String(address.postcode).padStart(5, '0')})`}
        </Text>
        
        ) : (
          <Text style={styles.addressText}>주소를 불러오는 중입니다...</Text>
        )}
      </View>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50, // 원형 이미지
    marginRight: 18, // 이미지와 텍스트 사이 간격
    borderWidth: 1, // 테두리 추가
    borderColor: '#ccc', // 테두리 색상
    backgroundColor: '#fff', // 흰색 배경으로 테두리와 대비되게
  },
  InfoContainer: {
    flexDirection: 'column',
    flex: 1, // 공간을 최대로 사용하게 설정
  },
  nickname: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
  greetings: {
    fontSize: 18,
    color: '#909090',
    fontFamily: 'Pretendard-Regular',
  },
  logoutButton: {
    borderRadius: 50,
    padding: 6,
    width: '20%',
    alignItems: 'center',
    backgroundColor: '#5DADE2',
  },
  logoutText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  separator: {
    height: 6,
    backgroundColor: '#F6F6F6',
  },
  payContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  pay: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Regular',
    letterSpacing: -0.25,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#909090',
    fontFamily: 'Pretendard-SemiBold',
    marginBottom : 8,
  },
  addressContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  addressbutton: {
    flexDirection: 'row', // 제목과 버튼을 수평으로 배치
    justifyContent: 'space-between', // 제목과 버튼을 양 끝에 배치
  },
  address: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Regular',
    letterSpacing: -0.25,
  },
  editButton: {
    borderBottomWidth: 1, // 밑줄 추가
    color: '#000', // 텍스트 색상
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    textDecorationLine: 'none', // 텍스트 밑줄을 없애기 위해
  },
});

export default MypageScreen;
