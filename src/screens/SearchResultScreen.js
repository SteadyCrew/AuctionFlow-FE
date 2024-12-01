import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const numColumns = 3; // 열 개수
const windowWidth = Dimensions.get('window').width;

const SearchResultScreen = ({route}) => {
  const {searchTerm} = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [endedItems, setEndedItems] = useState([]); // 종료된 상품 데이터
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://3.35.1.149:8080/items/search?keyword=${searchTerm}`,
        );
        const data = await response.json();
        setSearchResults(data);
        console.log(data);
      } catch (error) {
        console.error('결과를 불러오는데 실패했습니다.:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  // 종료된 상품 정보 가져오기
  useEffect(() => {
    const fetchEndedItems = async () => {
      try {
        const response = await fetch('http://3.35.1.149:8080/items/end');
        const data = await response.json();
        setEndedItems(data.map(item => item.itemId)); // 종료된 상품의 ID 목록만 저장
      } catch (error) {
        console.error('종료된 상품 데이터를 가져오는데 실패했습니다.:', error);
      }
    };

    fetchEndedItems();
  }, []);

  const formatData = (items, numColumns) => {
    const totalRows = Math.floor(items.length / numColumns);
    let totalLastRow = items.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      items.push({id: `blank-${totalLastRow}`, empty: true});
      totalLastRow++;
    }

    return items;
  };

  const renderItem = ({item}) => {
    if (item.empty) {
      return <View style={[styles.itemContainer, styles.itemInvisible]} />;
    }
    const isSoldOut = endedItems.includes(item.itemId); // 종료된 상품 여부 확인
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('Product', {itemId: item.itemId})}>
          <Image
            source={{
              uri:
                item.productImageUrls?.[0] ||
                'https://example.com/default-image.jpg',
            }}
            style={styles.itemImage}
          />

          {/* 종료된 상품인 경우 오버레이 표시 */}
          {isSoldOut && (
            <View style={styles.overlay}>
              <Text style={styles.soldOutText}>판매완료</Text>
            </View>
          )}

          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>{item.startingBid} 원</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>로딩 중...</Text>
      ) : searchResults.length > 0 ? (
        <>
          <Text style={styles.resultsCountText}>{`총 ${
            searchResults.filter(item => !item.empty).length
          }개의 결과`}</Text>
          <FlatList
            data={formatData(searchResults, numColumns)}
            renderItem={renderItem}
            keyExtractor={item =>
              item.itemId ? item.itemId.toString() : `key-${item.id}`
            }
            numColumns={numColumns}
            contentContainerStyle={styles.listContainer}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.noResultsContainer}>
          <Icon name="error-outline" size={50} color="#000" />
          <Text style={styles.noResultsText}>
            "{searchTerm}" 에 대한 검색 결과가 없습니다.{'\n'}다른 검색어로
            시도해보세요.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  resultsCountText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#000',
  },
  loadingText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center', // 수평 중앙 정렬
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingTop: 18,
    paddingBottom: 100,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 14,
    alignItems: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemImage: {
    width: windowWidth / (numColumns + 0.6),
    height: windowWidth / (numColumns + 0.6),
    resizeMode: 'cover',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: 'Pretendard-Regular',
    color: '#000',
    alignSelf: 'flex-start',
    marginLeft: 6,
  },
  itemPrice: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
    alignSelf: 'flex-start',
    marginLeft: 6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // 이미지와 동일한 둥글기
    zIndex: 1,
  },
  soldOutText: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
});

export default SearchResultScreen;
