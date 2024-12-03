import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import HomeTab from '../components/Tabs/HomeTab';
import Goods from '../components/Goods';
import {getData} from '../components/API/getData';

const HomeScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('랭킹');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터를 가져오는 함수
  // const fetchData = async () => {
  //   try {
  //     setLoading(true); // 로딩 상태 활성화
  //     const response = await axios.get(`${BASE_URL}/items`);
  //     const data = response.data;
  //
  //     // 가져온 데이터를 원하는 구조로 변환
  //     const formattedItems = data.map(item => ({
  //       id: item.itemId,
  //       image:
  //         item.productImageUrls?.[0] ||
  //         'https://archives.hangeul.go.kr/resource/template/images/img_none_01.png',
  //       title: item.title,
  //       price: `${item.startingBid?.toLocaleString() || 0}원`,
  //       itemBidStatus: item.itemBidStatus, // itemBidStatus 추가, 기본값은 'active'
  //     }));
  //
  //     setItems(formattedItems);
  //   } catch (error) {
  //     console.error('데이터 가져오기 실패:', error);
  //   } finally {
  //     setLoading(false); // 로딩 상태 비활성화
  //   }
  // };
  //
  // // 화면에 돌아올 때 데이터를 새로고침
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     fetchData(); // 데이터 새로고침
  //   });
  //
  //   return unsubscribe; // 컴포넌트가 unmount되면 listener 해제
  // }, [navigation]);

  // 컴포넌트가 마운트될 때 API로부터 데이터 가져오기
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);

      try {
        let endpoint = '';
        switch (selectedTab) {
          case '랭킹':
            endpoint = 'mypage/like/rank'; // 랭킹 데이터 API
            break;
          case '전체 목록':
            endpoint = 'items'; // 전체 목록 API
            break;
          case '판매 종료':
            endpoint = 'items/end'; // 판매 종료 API
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
  }, [selectedTab, navigation]); // selectedTab이 변경될 때마다 호출

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#5DADE2" />;
    }

    switch (selectedTab) {
      case '랭킹':
        const filteredItems = items.filter(
          item => item.itemBidStatus !== 'end',
        );
        return (
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>랭킹</Text>
              <Text style={styles.subText}>
                현재 인기 있는 상품을 찾아보세요!
              </Text>
            </View>
            <Goods items={filteredItems} />
          </View>
        );
      case '전체 목록':
        // 'end' 상태인 항목을 마지막으로 정렬
        const sortedItems = [
          ...items.filter(item => item.itemBidStatus !== 'end'), // 'end'가 아닌 항목
          ...items.filter(item => item.itemBidStatus === 'end'), // 'end' 상태인 항목
        ];
        return (
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>전체 목록</Text>
              <Text style={styles.subText}>
                상품 전체 목록을 한눈에 둘러보세요.
              </Text>
            </View>
            <Goods items={sortedItems} />
          </View>
        );
      case '판매 종료':
        return (
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>판매 종료</Text>
              <Text style={styles.subText}>
                판매가 종료된 상품의 적정가를 찾아보세요!
              </Text>
            </View>
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
          tabs={['랭킹', '전체 목록', '판매 종료']}
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
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  contentContainer: {
    paddingTop: 18,
  },
  row: {
    flexDirection: 'row', // 텍스트를 가로로 정렬
    paddingHorizontal: 24,
    alignItems: 'baseline', // 텍스트 기준선을 맞춤
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
  subText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#909090', // 작은 텍스트 색상
    marginLeft: 12, // "실시간 인기 순위"와 간격 추가
  },
});

export default HomeScreen;
