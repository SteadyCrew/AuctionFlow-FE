import React from 'react';
import { View, StyleSheet } from 'react-native';
import DaumPostcode from '@actbase/react-daum-postcode';

function AddressSearchScreen({ route, navigation }) {
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
      console.error('주소 선택 중 오류:', error);
      alert('주소를 처리하는 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <DaumPostcode
        style={styles.postcode}
        onSelected={handleAddressSelect}
      />
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
