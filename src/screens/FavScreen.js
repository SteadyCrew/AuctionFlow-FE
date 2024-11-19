import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Goods from '../components/Goods';
import {AuthContext} from '../components/Auth/AuthContext';
import {fetchDataAfterLogin} from '../components/fetchDataAfterLogin';

const FavScreen = () => {
  const {token} = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트될 때 API로부터 데이터 가져오기
  useEffect(() => {
    const loadItems = async () => {
      if (!token) {
        console.error('Token이 없습니다.'); // token이 없으면 요청하지 않음
        return;
      }

      setLoading(true);
      const formattedItems = await fetchDataAfterLogin('mypage/like', token); // token 전달
      setItems(formattedItems);
      setLoading(false);
    };

    loadItems();
  }, [token]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.text}>찜</Text>
          <Goods items={items} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 24,
    fontFamily: 'Pretendard-Bold',
  },
});

export default FavScreen;
