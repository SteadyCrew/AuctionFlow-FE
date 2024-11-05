import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../components/Auth/AuthContext';

const LogInScreen = ({navigation}) => {
  const {logIn} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Auction FLOW</Text>

      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity style={styles.kakaoButton} onPress={logIn}>
        <Text style={styles.kakaoButtonText}>카카오 로그인</Text>
      </TouchableOpacity>

      <Text style={styles.subText}>
        회원가입 및 로그인 후 이용이 가능합니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#5DADE2',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  kakaoButtonText: {
    fontSize: 18,
    color: '#000',
  },
  subText: {
    marginTop: 20,
    color: '#909090',
    fontSize: 14,
  },
});

export default LogInScreen;
