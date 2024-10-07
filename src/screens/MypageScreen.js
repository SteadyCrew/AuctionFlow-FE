import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MypageScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>마이페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});

export default MypageScreen;