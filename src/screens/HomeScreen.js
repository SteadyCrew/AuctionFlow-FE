import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import HomeTab from '../components/Tabs/HomeTab';
import Goods from '../components/Goods';
import {fetchData} from '../components/api';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('랭킹');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트될 때 API로부터 데이터 가져오기
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const formattedItems = await fetchData('items'); // fetchData 호출
      setItems(formattedItems);
      setLoading(false);
    };

    loadItems();
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
