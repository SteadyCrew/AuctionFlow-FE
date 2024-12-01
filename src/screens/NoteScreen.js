import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/Auth/AuthContext';

const NoteScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);  // AuthContext에서 토큰 가져오기

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://3.35.1.149:8080/notifications/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Bearer 토큰을 헤더에 추가
          },
        });

        if (!response.ok) {
          throw new Error('네트워크 오류 또는 인증 실패');
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);  // 로딩 완료
      }
    };

    fetchNotifications();
  }, [token]);

  // 로딩 중, 오류 발생 시 처리
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>로딩 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>오류 발생: {error}</Text>
      </View>
    );
  }

    // 알림이 없을 때 "알림이 없습니다." 메시지 표시
    if (notifications.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>알림이 없습니다.</Text>
        </View>
      );
    }

  const fetchReadNotifications = async (notificationId) => {
    try {
      const response = await fetch(`http://3.35.1.149:8080/notifications/${notificationId}`, {
        method: 'GET',  // 상태를 업데이트할 때는 PATCH를 사용
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('알림 읽기 처리 실패');
      }

      // 읽은 알림을 로컬에서 업데이트 (UI에 반영)
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.notificationId === notificationId
            ? { ...notification, isRead: true }  // isRead를 true로 업데이트
            : notification
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

 
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => fetchReadNotifications(item.notificationId)}>
        <View style={styles.notificationItem}>
          {/* 읽음/안 읽음 상태 표시 */}
          <View style={styles.readStatus}>
            {item.isRead ? (
              <Text style={styles.readText}>읽음</Text>
            ) : (
              <Text style={styles.unreadText}>안 읽음</Text>
            )}
          </View>

          {/* 알림 제목과 내용 */}
          <View style={styles.notificationContentWrapper}>
            <Text style={styles.notificationTitle}>!! 입찰 성공</Text>
            <Text style={styles.notificationContent}>
              축하합니다!{' '}상품
              <Text style={styles.itemTitle}> '{item.itemTitle}' </Text> 
              의 낙찰자가 되었습니다.{'\n'}최종 낙찰 금액은
              <Text style={styles.itemPrice}> {item.price}원 </Text>
              입니다.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.notificationId.toString()}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    position: 'relative', // 자식 요소들 위치를 위해 상대적 위치
    width: '100%',  // 전체 너비
  },
  notificationContentWrapper: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginBottom: 8,
    color: '#000',
  },
  notificationContent: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
    color: '#555',
  },
  itemTitle: {
    color: '#000',
    fontFamily: 'Pretendard-Bold',  // 예: 제목 부분을 볼드로
    fontSize: 16,  // 예: 가격 글씨를 조금 크게
  },
  itemPrice: {
    fontFamily: 'Pretendard-Bold',
    color: '#5DADE2',  // 예: 가격 부분은 초록색
    fontSize: 18,  // 예: 가격 글씨를 조금 크게
  },
  readStatus: {
    position: 'absolute', // 오른쪽 위로 고정
    top: 12,
    right: 16,
  },
  readText: {
    fontFamily: 'Pretendard-Regular',
    color: '#909090',
    fontSize: 14,
  },
  unreadText: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#000',
    fontSize: 14,
    borderBottomWidth: 1,  // 밑줄 두께
    borderBottomColor: '#000',  // 밑줄 색상
  },
});

export default NoteScreen;
