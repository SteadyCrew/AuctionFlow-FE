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
    borderRadius: 18,
    height: 28,
  },
  tab: {
    flex: 1,
    alignItems: 'center', // 가로 방향 중앙 정렬
    justifyContent: 'center', // 세로 방향 중앙 정렬
    borderRadius: 18,
  },
  activeTab: {
    backgroundColor: '#5DADE2', // 선택된 탭의 배경색
  },
  tabText: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    color: '#000',
    lineHeight: 28, // 탭의 높이와 동일하게 설정
    textAlignVertical: 'center', // 세로 방향 중앙 정렬
  },
  activeTabText: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#fff',
  },
});

export default GoodsTab;
