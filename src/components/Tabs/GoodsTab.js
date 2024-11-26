import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const GoodsTab = ({tabs, selectedTab, onTabPress}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.activeTab]} // 부모에서 전달된 selectedTab 확인
          onPress={() => onTabPress(tab)} // 클릭 시 부모의 상태 업데이트
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText,
            ]}>
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
    height: 30,
  },
  tab: {
    flex: 1,
    alignItems: 'center', // 가로 방향 중앙 정렬
    justifyContent: 'center', // 세로 방향 중앙 정렬
    borderRadius: 15,
    height: 30,
  },
  activeTab: {
    backgroundColor: '#5DADE2',
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
