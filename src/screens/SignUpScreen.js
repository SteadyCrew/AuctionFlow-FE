import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AuthContext} from '../components/Auth/AuthContext';

const SignUpScreen = ({navigation}) => {
  const {signUp} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const isSuccess = await signUp(email, nickname, password); // 회원가입 성공 여부 확인
    if (isSuccess) {
      navigation.navigate('LogIn'); // 회원가입 성공 시 로그인 화면으로 이동
    } else {
      console.error('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>
        <Text style={styles.largeText}>A</Text>
        <Text style={styles.smallText}>uction </Text>
        <Text style={styles.largeText}>FLOW</Text>
      </Text>

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

      {/* 닉네임 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        placeholderTextColor="#909090"
        value={nickname}
        onChangeText={setNickname}
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

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>회원가입</Text>
      </TouchableOpacity>

      <Text style={styles.subText}>
        이미 계정이 있으신가요?{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('LogIn')}>
          로그인
        </Text>
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
    marginBottom: 10,
    color: '#5DADE2',
  },
  largeText: {
    fontSize: 40, // 큰 텍스트 크기
  },
  smallText: {
    fontSize: 14, // 작은 텍스트 크기
  },
  input: {
    width: '90%',
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: '#5DADE2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 10,
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Pretendard-SemiBold',
  },
  subText: {
    fontFamily: 'Pretendard-Regular',
    marginTop: 8,
    color: '#909090',
    fontSize: 14,
  },
  linkText: {
    fontFamily: 'Pretendard-Bold',
    color: '#5DADE2',
    fontSize: 14,
  },
});

export default SignUpScreen;
