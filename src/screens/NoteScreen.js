import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>알림 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
  },
});

export default NoteScreen;
