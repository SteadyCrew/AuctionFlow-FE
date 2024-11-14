import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../components/Auth/AuthContext';

const MypageScreen = () => {
  const { nickname } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <View style = {styles.info}>
      <Text style={styles.nickname}>닉네임{nickname}</Text>
      </View>

      <View style={styles.separator} />

    </View>


    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  info: {
    paddingHorizontal: 24,
    marginTop: 18,
    marginBottom: 18,
  },
  nickname: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Pretendard-SemiBold',
  },
  separator: {
    height: 6,
    backgroundColor: '#F6F6F6',
  },
}); 

export default MypageScreen;
