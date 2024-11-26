import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import GoodsTab from '../components/Tabs/GoodsTab';
import Goods from '../components/Goods';
import {AuthContext} from '../components/Auth/AuthContext';
import {fetchDataAfterLogin} from '../components/API/fetchDataAfterLogin';

const MyDealScreen = () => {
  const {token} = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState('전체 목록');
  const [isBuying, setIsBuying] = useState(true); // 기본값을 구매로 설정
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // API로부터 데이터 가져오기
  useEffect(() => {
    const loadItems = async () => {
      console.log(token);
      if (!token) {
        console.error('Token이 없습니다.'); // token이 없으면 요청하지 않음
        return;
      }

      setLoading(true);

      try {
        // 엔드포인트 결정 (구매/판매 + 탭에 따라 다름)
        let endpoint = '';
        if (isBuying) {
          if (selectedTab === '전체 목록') endpoint = 'mypage/mylist';
          else if (selectedTab === '구매 중')
            endpoint = 'mypage/mylist?statusType=1';
          else if (selectedTab === '구매 완료')
            endpoint = 'mypage/mylist?statusType=2';
        } else {
          if (selectedTab === '전체 목록') endpoint = 'mypage/sell';
          else if (selectedTab === '판매 중')
            endpoint = 'mypage/sell?statusType=1';
          else if (selectedTab === '판매 완료')
            endpoint = 'mypage/sell?statusType=2';
        }

        // 데이터 가져오기
        const formattedItems = await fetchDataAfterLogin(endpoint, token);
        setItems(formattedItems);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedTab, isBuying, token]); // selectedTab, isBuying 변경 시 데이터 로드

  // 탭 클릭 핸들러
  const handleTabPress = tab => {
    console.log(`handleTabPress 함수 호출됨. 선택된 탭: ${tab}`);
    setSelectedTab(tab);
  };

  // 구매/판매 필터 토글
  const toggleFilter = () => {
    setIsBuying(prev => !prev);
    setSelectedTab('전체 목록'); // 탭을 기본값으로 설정
  };

  const tabs = isBuying
    ? ['전체 목록', '구매 중', '구매 완료']
    : ['전체 목록', '판매 중', '판매 완료'];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>
          {isBuying ? '내 거래 - 구매' : '내 거래 - 판매'}
        </Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            isBuying ? styles.inactiveButton : styles.activeButton,
          ]}
          onPress={toggleFilter}>
          <Text style={styles.filterButtonText}>
            {isBuying ? '판매내역 보기' : '구매내역 보기'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <GoodsTab
          tabs={tabs}
          selectedTab={selectedTab}
          onTabPress={handleTabPress}
        />
      </View>
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Goods items={items} />
        )}
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
  contentContainer: {
    paddingTop: 18,
    flex: 1,
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
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});

export default MyDealScreen;
