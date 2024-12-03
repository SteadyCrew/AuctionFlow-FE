import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // useNavigation import
import { AuthContext } from '../Auth/AuthContext';

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0); // 알림 개수를 저장할 상태
  const { token } = useContext(AuthContext); // AuthContext에서 token 가져오기
  const navigation = useNavigation(); // useNavigation을 사용하여 navigation 가져오기

  // API로 알림 개수 가져오기
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await fetch('http://3.35.1.149:8080/notifications/count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
          },
        });
        
        const count = await response.json(); // 응답에서 알림 개수 가져오기
        setNotificationCount(count); // 알림 개수 상태에 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotificationCount();
  }, [token]); // token이 변경될 때마다 알림 개수 재조회

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logo}>A FLOW</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Note')}>
          <Icon name="notifications-outline" size={22} color="black" />
          {/* 알림 개수가 0보다 큰 경우 숫자 표시 */}
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconMargin} onPress={() => navigation.navigate('Search')}>
          <Icon name="search-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 22,
    color: '#5DADE2',
    fontFamily: 'Pretendard-ExtraBold',
    letterSpacing: -1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    paddingLeft: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF0000',  // 더 강렬한 빨간색
    borderRadius: 10,
    width: 18,  // 크기 줄이기
    height: 18,  // 크기 줄이기
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    fontSize: 10,  // 텍스트 크기도 줄이기
  },
});

export default Header;
