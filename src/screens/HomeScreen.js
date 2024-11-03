import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeTab from '../components/Tabs/HomeTab';
import Goods from '../components/Goods';

const data = {
  랭킹: [
    {
      id: 1,
      title: '상품 1',
      price: '₩270,000',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: '상품 2',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 7,
      title: '상품 2',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 8,
      title: '상품 2',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 1,
      title: '상품 1',
      price: '₩270,000',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: '상품 222',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 7,
      title: '상품 1234',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 8,
      title: '상품 123',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 7,
      title: '상품 1234',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
    {
      id: 8,
      title: '상품 123',
      price: '₩280,000',
      image: 'https://example.com/image2.jpg',
    },
  ],
  전체목록: [
    {
      id: 3,
      title: '상품 3',
      price: '₩290,000',
      image: 'https://example.com/image3.jpg',
    },
    {
      id: 4,
      title: '상품 4',
      price: '₩300,000',
      image: 'https://example.com/image4.jpg',
    },
  ],
  판매목록: [
    {
      id: 5,
      title: '상품 5',
      price: '₩310,000',
      image: 'https://example.com/image5.jpg',
    },
    {
      id: 6,
      title: '상품 6',
      price: '₩320,000',
      image: 'https://example.com/image6.jpg',
    },
  ],
};

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('랭킹');
  const [items, setItems] = useState([]);

  // 컴포넌트가 렌더링될 때 로그 찍기
  useEffect(() => {
    console.log('컴포넌트가 렌더링됨. 선택된 탭:', selectedTab);
    setItems(data[selectedTab]); // 선택된 탭에 따라 아이템을 업데이트합니다.
  }, [selectedTab]);

  const handleTabPress = tab => {
    console.log(`handleTabPress 함수 호출됨. 선택된 탭: ${tab}`); // 탭 선택 시 호출 여부 확인
    setSelectedTab(tab);
  };

  const renderContent = () => {
    console.log(`선택된 탭: ${selectedTab}`); // 선택된 탭에 따라 내용을 표시하기 전 로그 찍기
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
      {/* 탭 위에 여백을 추가 */}
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
    paddingHorizontal: 24,
  },
  tabContainer: {
    paddingTop: 8,
  },
  contentContainer: {
    paddingTop: 18,
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
});

export default HomeScreen;
