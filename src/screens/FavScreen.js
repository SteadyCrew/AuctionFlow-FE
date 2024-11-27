import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Goods from '../components/Goods';
import {AuthContext} from '../components/Auth/AuthContext';
import {fetchDataAfterLogin} from '../components/API/fetchDataAfterLogin';
import {deleteData} from '../components/API/deleteData';
import {useFocusEffect} from '@react-navigation/native';

const FavScreen = () => {
  const {token} = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // 컴포넌트가 마운트될 때 API로부터 데이터 가져오기
  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        if (!token) {
          console.error('Token이 없습니다.'); // token이 없으면 요청하지 않음
          return;
        }

        setLoading(true);
        try {
          const formattedItems = await fetchDataAfterLogin(
            'mypage/like',
            token,
          ); // token 전달
          setItems(formattedItems);
        } catch (error) {
          console.error('데이터 로드 실패:', error);
          Alert.alert('오류', '찜 데이터를 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };

      loadItems();
    }, [token]), // token이 변경될 때만 새로고침
  );

  const handleDelete = async itemId => {
    try {
      const success = await deleteData('mypage/like', token, itemId);
      if (success) {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // UI에서 삭제된 항목 제거
      } else {
        Alert.alert('삭제 실패', '항목을 삭제할 수 없습니다.');
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      Alert.alert('삭제 실패', '항목을 삭제할 수 없습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* 헤더 부분 */}
          <View style={styles.headerContainer}>
            <Text style={styles.text}>찜</Text>
            <TouchableOpacity
              style={[
                styles.editButton,
                isEditing ? styles.editButtonEditing : styles.editButtonDefault,
              ]}
              onPress={() => setIsEditing(prev => !prev)} // 편집 모드 토글
            >
              <Text
                style={
                  isEditing
                    ? styles.editButtonTextEditing
                    : styles.editButtonTextDefault
                }>
                {isEditing ? '완료' : '편집'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Goods 컴포넌트 */}
          <Goods items={items} onDelete={isEditing ? handleDelete : null} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  editButtonEditing: {
    backgroundColor: '#5DADE2', // "완료" 버튼 배경색
  },
  editButtonDefault: {
    backgroundColor: 'transparent', // "편집"은 배경 투명
  },
  editButtonTextEditing: {
    color: '#fff', // "완료" 텍스트 색상
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
  },
  editButtonTextDefault: {
    textDecorationLine: 'underline', // "편집" 텍스트 밑줄
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: '#000', // 검정 텍스트
  },
});

export default FavScreen;
