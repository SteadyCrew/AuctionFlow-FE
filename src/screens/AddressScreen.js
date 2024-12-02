import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { AuthContext } from '../components/Auth/AuthContext';
import CustomToast from '../components/CustomToast';

function AddressScreen({ route }) {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const { zipcode, areaAddress, townAddress } = route.params || {};  // 전달된 데이터 받기
  const [addressObj, setAddressObj] = useState({
    zipcode: zipcode || '',
    areaAddress: areaAddress || '',
    townAddress: townAddress || ''
  });

  const { token } = useContext(AuthContext); 
  const navigation = useNavigation();

  useEffect(() => {
    if (zipcode && areaAddress) {
      setAddressObj({
        zipcode,
        areaAddress,
        townAddress: townAddress || ''
      });
    }
  }, [zipcode, areaAddress, townAddress]);

  const handleSave = async () => {
    try {
      const { zipcode, areaAddress, townAddress } = addressObj;
  
      // 주소가 이미 설정되어 있는지 확인하기 위해 먼저 조회 요청
      const checkResponse = await fetch('http://3.35.1.149:8080/mypage/store/storeInfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (checkResponse.ok) {
        // 이미 주소가 설정된 경우, PATCH 요청
        const response = await fetch('http://3.35.1.149:8080/mypage/store', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postcode: zipcode,
            basicAddr: areaAddress,
            detailAddr: townAddress,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setToastMessage('주소가 수정 되었습니다.');
          setToastVisible(true);  // 오류 메시지 표시

        // 잠시 후 MyPageScreen으로 이동
        setTimeout(() => {
          navigation.goBack();
          setToastVisible(false); // 토스트 메시지 숨기기
        }, 1000); // 2초 후에 이동
        } else {
          setToastMessage('주소 수정에 실패했습니다..');
          setToastVisible(true);  // 오류 메시지 표시
        }
      } else {
        // 주소가 없는 경우, POST 요청
        const response = await fetch('http://3.35.1.149:8080/mypage/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postcode: zipcode,
            basicAddr: areaAddress,
            detailAddr: townAddress,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setToastMessage('주소가 수정 되었습니다.');
          setToastVisible(true);  // 오류 메시지 표시
          navigation.goBack();
        } else {
          setToastMessage('주소가 수정 되었습니다.');
          setToastVisible(true);  // 오류 메시지 표시
        }
      }
    } catch (error) {
      setToastMessage('주소 저장 중 오류가 발생했습니다.');
      setToastVisible(true);  // 오류 메시지 표시
    }
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddressSearch')}>
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>

      {/* CustomToast 컴포넌트 */}
      {toastVisible && (
        <CustomToast
          message={toastMessage}
          visible={toastVisible}
          duration={3000} // 표시 시간을 3초로 설정
        />
      )}

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
