import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const CustomToast = ({ message, visible, duration }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // 애니메이션 값

  useEffect(() => {
    if (visible) {
      // Toast 메시지 보이기
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // 지정된 시간 후 Toast 메시지 숨기기
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, duration);
    }
  }, [visible, fadeAnim, duration]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { opacity: fadeAnim }, // 애니메이션을 opacity에 적용
      ]}
    >
      <View style={styles.toastContent}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute', // 화면 하단에 고정
    bottom: 50, // 화면 하단 20px 위에 고정
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999, // 다른 UI 요소들 위에
  },
  toastContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 반투명 배경
    borderRadius: 12,
    paddingVertical: 16,
    width: '88%', // 화면의 80% 정도 너비로 설정
  },
  toastText: {
    fontFamily: 'Pretendard-Regular',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CustomToast;
