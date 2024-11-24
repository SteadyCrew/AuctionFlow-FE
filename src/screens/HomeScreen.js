import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import HomeTab from '../components/Tabs/HomeTab';
import Goods from '../components/Goods';
import {getData} from '../components/API/getData';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('랭킹');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트될 때 API로부터 데이터 가져오기
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);

      try {
        let endpoint = '';
        switch (selectedTab) {
          case '랭킹':
            endpoint = 'items/selling'; // 랭킹 데이터 API
            break;
          case '전체목록':
            endpoint = 'items'; // 전체 목록 API
            break;
          case '판매목록':
            endpoint = 'items/end'; // 판매 목록 API
            break;
          default:
            console.error('알 수 없는 탭입니다:', selectedTab);
            return;
        }

        const data = await getData(endpoint); // API 요청
        setItems(data);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedTab]); // selectedTab이 변경될 때마다 호출

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
