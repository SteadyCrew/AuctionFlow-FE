import React from 'react';
import { View } from 'react-native';
import DaumPostcode from '@actbase/react-daum-postcode';

function AddressSearchScreen({ route, navigation }) {
  const handleAddressSelect = (data) => {
    // 주소 선택 후, 이전 화면으로 데이터 전달
    navigation.navigate('AddressScreen', {
      zipcode: data.zonecode,
      areaAddress: data.address,
      townAddress: '', // 상세 주소는 빈 값으로 설정
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <DaumPostcode
        style={{ width: '100%', height: '100%' }}
        onSelected={handleAddressSelect} // 주소 선택 시 호출
      />
    </View>
  );
}

export default AddressSearchScreen;
