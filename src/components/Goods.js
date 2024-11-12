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
          onPress={() => navigation.navigate('상품', {itemId: item.id})}>
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
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    flex: 1,
    height: 0,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 5,
    alignItems: 'center',
    borderRadius: 5,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemImage: {
    width: windowWidth / (numColumns + 2), // 이미지 너비
    height: 95, // 이미지 높이
    resizeMode: 'cover', // 이미지 비율 유지
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default Goods;
