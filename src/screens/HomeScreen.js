import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import HomeTab from '../components/Tabs/HomeTab';
import Goods from '../components/Goods';
import {BASE_URL} from '../config/api';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('랭킹');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트될 때 API로부터 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`); // localhost 대신 IP 주소 사용
        const data = response.data;

        // 가져온 데이터를 원하는 구조로 변환
        const formattedItems = data.map(item => ({
          id: item.itemId,
          image:
            item.productImageUrls[0] ||
            'https://archives.hangeul.go.kr/resource/template/images/img_none_01.png', // 이미지가 없을 경우 기본 이미지 사용
          // 현재 인터넷 이미지 주소를 사용 AWS에 새로운 default 이미지 생성 필요
          title: item.title,
          price: `${item.startingBid.toLocaleString()}원`, // 가격에 통화 기호 추가
        }));

        setItems(formattedItems);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabPress = tab => {
    console.log(`handleTabPress 함수 호출됨. 선택된 탭: ${tab}`);
    setSelectedTab(tab);
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    console.log(`선택된 탭: ${selectedTab}`);
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
