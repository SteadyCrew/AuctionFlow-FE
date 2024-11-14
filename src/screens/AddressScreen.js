import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import DaumPostcode from '@actbase/react-daum-postcode';
import { AuthContext } from '../components/Auth/AuthContext';
import { useNavigation } from '@react-navigation/native'; // useNavigation 훅 추가

function AddressScreen() {
  const [addressObj, setAddressObj] = useState({
    zipcode: '',
    areaAddress: '',
    townAddress: ''
  });

  const [modalVisible, setModalVisible] = useState(false);
  const { token } = useContext(AuthContext); 
  const navigation = useNavigation(); // 네비게이션 객체 추가

  const handleAddressSearch = () => {
    setModalVisible(true); // 주소찾기 버튼 클릭 시 모달 띄우기
  };

  const handleSave = async () => {
    try {
      // POST 요청을 보낼 주소 데이터 형식
      const { zipcode, areaAddress, townAddress } = addressObj;
      
      // POST 요청 보내기
      const response = await fetch('http://3.35.1.149:8080/mypage/store', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 인증 토큰 추가
        },
        body: JSON.stringify({
          postcode: zipcode,
          basicAddr: areaAddress,
          detailAddr: townAddress,
        }),
      });

      const data = await response.json();

      // 요청 성공 시
      if (response.ok) {
        alert('주소가 저장되었습니다.');
        navigation.goBack(); // 저장 후 MypageScreen으로 돌아가기
      } else {
        // 요청 실패 시
        alert('주소 저장에 실패했습니다.');
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error(error);
      alert('주소 저장 중 오류가 발생했습니다.');
    }
  };

  const handleAddressSelect = (data) => {
    setAddressObj({
      zipcode: data.zonecode, // 우편번호
      areaAddress: data.address, // 도로명 주소만 채움
      townAddress: '', // 상세 주소는 빈 상태로 두어 사용자가 입력하도록
    });
    setModalVisible(false); // 주소 선택 후 모달 닫기
  };

  return (
    <View style={styles.container}>

      <View style={styles.zipcodeContainer}>
        <TextInput
          style={styles.zipcodeInput}
          placeholder="우편번호"
          value={addressObj.zipcode}
          onChangeText={(text) => setAddressObj(prev => ({ ...prev, zipcode: text }))}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddressSearch}>
            <Text style={styles.buttonText}>주소 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="주소를 입력해주세요."
        value={addressObj.areaAddress}
        onChangeText={(text) => setAddressObj(prev => ({ ...prev, areaAddress: text }))}
      />

      <TextInput
        style={styles.input}
        placeholder="상세 주소를 입력해주세요."
        value={addressObj.townAddress}
        onChangeText={(text) => setAddressObj(prev => ({ ...prev, townAddress: text }))}
      />

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>

      {/* 주소찾기 모달 */}
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={{ flex: 1 }}>
          <DaumPostcode
            style={{ width: '100%', height: '100%' }}
            onSelected={handleAddressSelect} // 주소 선택 시 호출
          />
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 28,
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 12,
    height: 44,
    borderRadius: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  zipcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  zipcodeInput: {
    flex: 7,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 12,
    height: 44,
    borderRadius: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flex: 3,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 40,
  },
  saveButton: {
    backgroundColor: '#000',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default AddressScreen;
