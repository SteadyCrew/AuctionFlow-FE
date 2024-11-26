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

const Goods = ({items, onDelete}) => {
  const navigation = useNavigation();

  const formatData = (data, numColumn) => {
    const totalRows = Math.floor(items.length / numColumn); // 전체 행 수 계산
    let totalLastRow = data.length - totalRows * numColumn; // 마지막 행의 아이템 수

    // 마지막 행에 빈 공간이 있으면 빈 객체를 추가하여 균등하게 만듦
    while (totalLastRow !== 0 && totalLastRow !== numColumn) {
      data.push({id: `blank-${totalLastRow}`, empty: true});
      totalLastRow++;
    }

    return data;
  };

  const renderItem = ({item}) => {
    if (item.empty) {
      // 빈 아이템에 대한 렌더링
      return <View style={[styles.itemContainer, styles.itemInvisible]} />;
    }

    return (
      <View style={styles.itemContainer}>
        {/* 상품 이미지 및 정보 */}
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('Product', {itemId: item.id})}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>

        {/* 삭제 버튼 (onDelete가 제공되었을 때만 표시) */}
        {onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              onDelete(item.id);
              console.log('삭제할 아이템 ID:', item.id);
            }}>
            <View style={styles.deleteButtonIcon}>
              <Text style={styles.deleteButtonText}>–</Text>
            </View>
          </TouchableOpacity>
        )}
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
    position: 'relative', // 삭제 버튼을 절대 위치로 배치하기 위해 필요
  },
  itemImage: {
    width: windowWidth / (numColumns + 0.6), // 1:1 비율을 위해 너비에 맞춘 높이 설정
    height: windowWidth / (numColumns + 0.6), // 너비와 동일한 높이로 설정
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
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 14,
    backgroundColor: '#000', // 검정색 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonIcon: {
    width: 15,
    height: 2,
    backgroundColor: '#fff', // 흰색 대시
    borderRadius: 1,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

export default Goods;
