import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AuthContext} from '../components/Auth/AuthContext';

const LogInScreen = ({navigation}) => {
  const {logIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    logIn(email, password); // 이메일과 비밀번호를 logIn 함수에 전달
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Auction FLOW</Text>

      {/* 이메일 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#909090"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* 비밀번호 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#909090"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 회원가입 및 로그인 안내 문구 */}
      <Text style={styles.subText}>
        <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('SignUp')}>
            회원가입{' '}
          </Text>
         및 로그인 후 이용이 가능합니다.
      </Text>
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
    fontSize: 32,
    marginBottom: 20,
    color: '#5DADE2',
  },
  input: {
    width: '90%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#5DADE2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 30,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Pretendard-SemiBold',
  },
  subText: {
    fontFamily: 'Pretendard-Regular',
    marginTop: 20,
    color: '#909090',
    fontSize: 14,
  },
  linkText: {
    fontFamily: 'Pretendard-Bold',
    color: '#5DADE2',
    fontSize: 14,
  },
});

export default LogInScreen;
