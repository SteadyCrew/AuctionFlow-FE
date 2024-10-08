import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GoodsTab from '../components/Tabs/GoodsTab';

const MyDealScreen = () => {
  const [selectedTab, setSelectedTab] = useState('전체 목록');
  const [isBuying, setIsBuying] = useState(true); // 기본값을 구매로 설정

  useEffect(() => {
    console.log("컴포넌트가 렌더링됨. 선택된 탭:", selectedTab);
  }, [selectedTab]);

  const handleTabPress = (tab) => {
    console.log(`handleTabPress 함수 호출됨. 선택된 탭: ${tab}`);
    setSelectedTab(tab);
  };

  const toggleFilter = () => {
    setIsBuying(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>{isBuying ? '내 거래 - 구매' : '내 거래 - 판매'}</Text>
        <TouchableOpacity 
          style={[styles.filterButton, isBuying ? styles.inactiveButton : styles.activeButton]} 
          onPress={toggleFilter}
        >
          <Text style={styles.filterButtonText}>{isBuying ? '판매내역 보기' : '구매내역 보기'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <GoodsTab tabs={['전체 목록', '구매 중', '구매 완료']} onTabPress={handleTabPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  tabContainer: {
    paddingTop: 18,
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12, // 좌우 여백 추가
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: '#4C8FD4', // 선택된 색상
  },
  inactiveButton: {
    backgroundColor: '#E57A7A', // 기본 색상
  },
  filterButtonText: {
    color: '#fff',
    fontSize : 14,
    fontFamily: 'Pretendard-Regular'
  },
});

export default MyDealScreen;
