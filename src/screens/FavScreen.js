import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>찜</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 10
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
});

export default FavScreen;