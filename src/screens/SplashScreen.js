import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>
        <Text style={styles.largeText}>A</Text>
        <Text style={styles.smallText}>UCTION </Text>
        <Text style={styles.largeText}>FLOW</Text>
      </Text>
      <ActivityIndicator size="large" color="#5DADE2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  logoText: {
    fontFamily: 'Pretendard-ExtraBold',
    marginBottom: 20,
    color: '#5DADE2',
  },
  largeText: {
    fontSize: 40, // 큰 텍스트 크기
  },
  smallText: {
    fontSize: 14, // 작은 텍스트 크기
  },
});

export default SplashScreen;
