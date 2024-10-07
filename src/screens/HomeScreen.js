import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeTab from '../components/Tabs/HomeTab';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('랭킹');

  // 컴포넌트가 렌더링될 때 로그 찍기
  useEffect(() => {
    console.log("컴포넌트가 렌더링됨. 선택된 탭:", selectedTab);
  }, [selectedTab]);

  const handleTabPress = (tab) => {
    console.log(`handleTabPress 함수 호출됨. 선택된 탭: ${tab}`); // 탭 선택 시 호출 여부 확인
    setSelectedTab(tab);
  };

  const renderContent = () => {
    console.log(`선택된 탭: ${selectedTab}`); // 선택된 탭에 따라 내용을 표시하기 전 로그 찍기
    switch (selectedTab) {
      case '랭킹':
        return <Text style={styles.text}>실시간 인기 순위</Text>;
      case '전체 목록':
        return <Text style={styles.text}>전체 목록</Text>;
      case '판매 목록':
        return <Text style={styles.text}>판매 종료</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* 탭 위에 여백을 추가 */}
      <View style={styles.tabContainer}>
        <HomeTab tabs={['랭킹', '전체 목록', '판매 목록']} onTabPress={handleTabPress} />
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
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
  tabContainer: {
    paddingTop: 8
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
