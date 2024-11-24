import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import HomeTab from '../components/Tabs/HomeTab';
import Goods from '../components/Goods';
import {BASE_URL} from '../config/api';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('랭킹');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      setLoading(true); // 로딩 상태 활성화
      const response = await axios.get(`${BASE_URL}/items`);
      const data = response.data;

      // 가져온 데이터를 원하는 구조로 변환
      const formattedItems = data.map(item => ({
        id: item.itemId,
        image:
          item.productImageUrls[0] ||
          'https://archives.hangeul.go.kr/resource/template/images/img_none_01.png',
        title: item.title,
        price: `${item.startingBid.toLocaleString()}원`,
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  // 화면에 돌아올 때 데이터를 새로고침
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // 데이터 새로고침
    });

    return unsubscribe; // 컴포넌트가 unmount되면 listener 해제
  }, [navigation]);

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    switch (selectedTab) {
      case '랭킹':
        return (
          <View>
            <Text style={styles.text}>실시간 인기 순위</Text>
            <Goods items={items} />
          </View>
        );
      case '전체목록':
        return (
          <View>
            <Text style={styles.text}>전체 목록</Text>
            <Goods items={items} />
          </View>
        );
      case '판매목록':
        return (
          <View>
            <Text style={styles.text}>판매 종료</Text>
            <Goods items={items} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <HomeTab
          tabs={['랭킹', '전체목록', '판매목록']}
          onTabPress={handleTabPress}
        />
      </View>
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  contentContainer: {
    paddingTop: 18,
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
});

export default HomeScreen;
