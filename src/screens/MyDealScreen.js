import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyDealScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>내 거래</Text>
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

export default MyDealScreen;