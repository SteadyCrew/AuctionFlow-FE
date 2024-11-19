import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const numColumns = 3;
const windowWidth = Dimensions.get('window').width;

const Goods = ({items}) => {
  const navigation = useNavigation();
  const formatData = (items, numColumns) => {
    const totalRows = Math.floor(items.length / numColumns); // 전체 행 수 계산
    let totalLastRow = items.length - totalRows * numColumns; // 마지막 행의 아이템 수

    // 마지막 행에 빈 공간이 있으면 빈 객체를 추가하여 균등하게 만듦
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      items.push({id: `blank-${totalLastRow}`, empty: true});
      totalLastRow++;
    }

    return items;
  };
  const renderItem = ({item}) => {
    if (item.empty) {
      // 빈 아이템에 대한 렌더링, 완전히 투명하고 크기가 없도록 설정
      return <View style={[styles.itemContainer, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('Product', {itemId: item.id})}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={formatData(items, numColumns)}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 140,
    paddingHorizontal: 24,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 14,
    alignItems: 'center',
  },
  itemImage: {
    width: windowWidth / (numColumns + 0.6), // 1:1 비율을 위해 너비에 맞춘 높이 설정
    height: windowWidth / (numColumns + 0.6), // 너비와 동일한 높이로 설정
    resizeMode: 'cover',
    borderRadius: 8, // 둥근 모서리 적용
  },
  itemTitle: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: 'Pretendard-Regular',
    color: '#000',
    alignSelf: 'flex-start', // 왼쪽 정렬
    marginLeft: 6, // 왼쪽 여백 추가
  },
  itemPrice: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Bold',
    alignSelf: 'flex-start', // 왼쪽 정렬
    marginLeft: 6, // 왼쪽 여백 추가
  },
});



export default Goods;
