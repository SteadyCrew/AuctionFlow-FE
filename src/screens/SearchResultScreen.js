import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const numColumns = 3; // 열 개수
const windowWidth = Dimensions.get('window').width;

const SearchResultScreen = ({ route }) => {
  const { searchTerm } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://3.35.1.149:8080/items/search?keyword=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('결과를 불러오는데 실패했습니다.:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const formatData = (items, numColumns) => {
    const totalRows = Math.floor(items.length / numColumns);
    let totalLastRow = items.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      items.push({ id: `blank-${totalLastRow}`, empty: true });
      totalLastRow++;
    }

    return items;
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.itemContainer, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => navigation.navigate('Product', { itemId: item.itemId })}
        >
          <Image
            source={{
              uri: item.productImageUrls?.[0] || 'https://example.com/default-image.jpg',
            }}
            style={styles.itemImage}
          />
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
        <Text style={styles.resultsCountText}>{`총 ${searchResults.length}개의 결과`}</Text>
        <FlatList
          data={formatData(searchResults, numColumns)}
          renderItem={renderItem}
          keyExtractor={(item) => (item.itemId ? item.itemId.toString() : `key-${item.id}`)}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
      </>
      ) : (
        <View style={styles.noResultsContainer}>
          <Icon name="error-outline" size={50} color="#000"/>
          <Text style={styles.noResultsText}>
            "{searchTerm}" 에 대한 검색 결과가 없습니다.{'\n'}다른 검색어로 시도해보세요.
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
    marginTop:20,
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
});

export default SearchResultScreen;
