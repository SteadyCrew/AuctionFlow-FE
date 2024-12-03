import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DaumPostcode from '@actbase/react-daum-postcode';
import CustomToast from '../components/CustomToast';


function AddressSearchScreen({ route, navigation }) {

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const handleAddressSelect = (data) => {
    try {
      const fullAddress = data.address;
      const buildingName = data.buildingName || '';
      navigation.navigate('AddressScreen', {
        zipcode: data.zonecode,
        areaAddress: fullAddress + buildingName,
        townAddress: '', // 상세 주소는 별도로 입력
      });
    } catch (error) {
      setToastMessage('주소를 처리하는 중 문제가 발생했습니다.');
      setToastVisible(true);  // 오류 메시지 표시

    }
  };

  return (
    <View style={styles.container}>
      <DaumPostcode
        style={styles.postcode}
        onSelected={handleAddressSelect}
      />
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
  },
  postcode: {
    width: '100%',
    height: '100%',
  },
});

export default AddressSearchScreen;
