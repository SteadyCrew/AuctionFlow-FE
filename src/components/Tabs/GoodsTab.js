import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GoodsTab = ({ tabs, onTabPress }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    onTabPress(tab); // 선택한 탭에 대한 동작을 부모 컴포넌트에 전달
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => handleTabPress(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    height: 30, // 높이를 24로 설정
  },
  tab: {
    flex: 1,
    alignItems: 'center', // 가로 방향 중앙 정렬
    justifyContent: 'center', // 세로 방향 중앙 정렬
    borderRadius: 15,
    height: 30,
  },
  activeTab: {
    backgroundColor: '#5DADE2', // 선택된 탭의 배경색
  },
  tabText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: '#000', // 선택되지 않은 탭의 글씨 색상 (검정)
  },
  activeTabText: {
    color: '#fff',
  },
});

export default GoodsTab;
