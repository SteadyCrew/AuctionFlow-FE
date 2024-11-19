import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../components/Auth/AuthContext';

const ProductScreen = () => {
  const {token} = useContext(AuthContext);
  const route = useRoute();
  const {itemId} = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const { token } = useContext(AuthContext); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://3.35.1.149:8080/items/${itemId}`, {
        });
        setProduct(response.data);
      } catch (error) {
        setError('상품 정보가 존재하지 않습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails(); 
  }, [itemId]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(
          `http://3.35.1.149:8080/auction/bids/${itemId}`, // 상품 아이디에 해당하는 입찰 내역 요청
          {
            headers: {
              Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
          }
        );
        
        // 입찰 내역을 최신 순으로 정렬 (내림차순)
        const sortedBids = response.data.sort((a, b) => b.bidId - a.bidId);
        setBids(sortedBids);
      } catch (error) {
        console.error("입찰 내역 불러오기 실패:", error);
        if (error.response) {
          if (error.response.status === 403) {
            Alert.alert("권한이 없습니다. 다시 로그인 해주세요.");
          } else {
            Alert.alert("입찰 내역을 불러오지 못했습니다.");
          }
        }
      }
    };
  
    fetchBids(); // fetchBids 함수 호출
  }, [itemId, token]); // itemId나 token이 변경될 때마다 호출
  
  
  

  const handleBidSubmit = async () => {
    // 입찰 금액 유효성 검사
    if (bidError || !bidAmount) {
      Alert.alert("입찰 금액이 유효하지 않습니다.");
      return;
    }
  
    // 토큰이 없는 경우 체크
    if (!token) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://3.35.1.149:8080/auction/bid`,
        null,  // 데이터 본문은 비어있으므로 null로 설정
        {
          params: {
            itemId,
            bidAmount: parseInt(bidAmount, 10),
          },
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        }
      );
  
      Alert.alert("입찰이 성공적으로 완료되었습니다.");
      setBidAmount(''); // 입력 필드 초기화
      setBidError(''); // 오류 메시지 초기화
    } catch (error) {
      console.error("입찰 실패 에러: ", error);
  
      if (error.response) {
        // 서버에서 응답을 받았을 때
        console.error("응답 오류:", error.response);
  
        // 403 오류에 대한 세부 메시지 처리
        if (error.response.status === 403) {
          Alert.alert("권한이 없습니다. 다시 시도해 주세요.");
        } else {
          Alert.alert(error.response?.data?.message || "입찰에 실패했습니다.");
        }
      } else if (error.request) {
        // 요청이 보내졌지만 응답이 없을 때
        console.error("요청 오류:", error.request);
        Alert.alert("서버 응답이 없습니다. 다시 시도해주세요.");
      } else {
        // 다른 오류 발생 시
        console.error("에러 메시지:", error.message);
        Alert.alert("입찰에 실패했습니다.");
      }
    }
  };
  
  
  
  
  // 입찰 금액 유효성 검사 함수
  const validateBidAmount = (value) => {
    const parsedBidAmount = parseInt(value, 10);
    
    // 숫자가 아니거나 100의 배수가 아니면 오류 메시지 설정
    if (isNaN(parsedBidAmount) || parsedBidAmount % 100 !== 0) {
      setBidError('입찰 금액은 100원 단위로 가능합니다.');
    } else {
      setBidError('');
    }
  };
  
  // 입찰 금액 변화 처리
  const handleBidAmountChange = (value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, ''); // 숫자만 허용
    setBidAmount(sanitizedValue);
    validateBidAmount(sanitizedValue); // 유효성 검사
  };
  

  const handleNextImage = () => {
    if (
      product &&
      product.productImageUrls &&
      product.productImageUrls.length > 1
    ) {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % product.productImageUrls.length,
      );
    }
  };

  const handlePrevImage = () => {
    if (
      product &&
      product.productImageUrls &&
      product.productImageUrls.length > 1
    ) {
      setCurrentImageIndex(
        prevIndex =>
          (prevIndex - 1 + product.productImageUrls.length) %
          product.productImageUrls.length,
      );
    }
  };

  const handleFavorite = async () => {
    try {
      if (!token) {
        console.error('Token이 없습니다.'); // 토큰이 없으면 요청하지 않음
        Alert.alert('로그인이 필요합니다.');
        return;
      }

      if (isFavorited) {
        // DELETE 요청
        await axios.delete(
          `http://3.35.1.149:8080/mypage/like`, // endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer 토큰 전달
            },
            data: {itemId}, // DELETE 요청에서 body 전달
          },
        );
        Alert.alert('찜 목록에서 제거되었습니다!');
      } else {
        // POST 요청
        await axios.post(
          `http://3.35.1.149:8080/mypage/like`, // endpoint
          {itemId}, // Body에 itemId 전달
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer 토큰 전달
            },
          },
        );
        Alert.alert('찜 목록에 추가되었습니다!');
      }

      setIsFavorited(!isFavorited); // 상태 업데이트
    } catch (error) {
      console.error('찜 상태 업데이트 실패:', error);
      Alert.alert('찜 상태를 변경하는 데 실패했습니다.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error || !product) {
    return <Text>{error || '상품을 찾을 수 없습니다.'}</Text>;
  }

  const imageUrl =
    product.productImageUrls && product.productImageUrls.length > 0
      ? product.productImageUrls[currentImageIndex]
      : 'https://via.placeholder.com/150';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageGallery}>
        <TouchableOpacity
          onPress={handlePrevImage}
          style={[styles.arrowButton, styles.leftArrow]}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <Image source={{uri: imageUrl}} style={styles.productImage} />
        <TouchableOpacity
          onPress={handleNextImage}
          style={[styles.arrowButton, styles.rightArrow]}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 카테고리 및 상품 정보 바 */}
      <View style={styles.infoBar}>
        <Text style={styles.productCategory}>#{product.categoryId}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>
            {product.startingBid
              ? product.startingBid.toLocaleString()
              : '가격 정보 없음'}{' '}
            원
          </Text>
          <TouchableOpacity onPress={handleFavorite} style={styles.heartButton}>
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'} // 채워진 하트 또는 빈 하트
              size={28}
              color={isFavorited ? 'red' : '#909090'} // 상태에 따른 색상
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productLabel}>상품명</Text>
          <Text style={styles.productTitle}>{product.title}</Text>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productLabel}>상품 상태</Text>
          <Text style={styles.productStatus}>{product.productStatus}</Text>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productLabel}>상품 설명 </Text>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <View style={styles.separator} />
      <View style={styles.bidContainer}>
        <Text style={styles.bidLabel}>최근 제시가</Text>
          {bids.length > 0 ? (
            <View style={styles.recentPrice}>
              {bids
                .map((bid, index) => (
                  <View
                    key={bid.bidId}
                    style={[
                      styles.bidBlock,
                      index === 0 && styles.recentBid, // 가장 최근 입찰에 스타일 적용
                    ]}
                  >
                    <Text style={styles.bidAmount}>
                      {bid.bidAmount.toLocaleString()}원
                    </Text>
                  </View>
                ))}
            </View>
          ) : (
            <Text style={styles.noBids}>입찰 금액이 아직 존재하지 않습니다.</Text>
          )}


      </View>


    <View style={styles.separator} />
      
      <View style={styles.bidContainer}>
        <Text style={styles.bidLabel}>입찰제안</Text>
        <View style={styles.bidInputContainer}>
          <TextInput
            placeholder="입찰 금액"
            value={bidAmount}
            onChangeText={handleBidAmountChange}
            style={styles.bidInput}
            keyboardType="numeric" // 숫자 키보드만 표시
          />
          <TouchableOpacity style={styles.button} onPress={handleBidSubmit}>
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
        </View>
        {bidError ? <Text style={styles.error}>{bidError}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageGallery: {
    position: 'relative',
    overflow: 'hidden',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    padding: 8,
  },
  leftArrow: {
    left: 5,
  },
  rightArrow: {
    right: 5,
  },
  arrowText: {
    fontSize: 24,
    color: '#333',
  },
  productImage: {
    width: '100%',
    aspectRatio: 1, // 1:1 비율 설정
    resizeMode: 'cover',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heartButton: {
    marginLeft: 10,
    marginBottom: 18,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5DADE2',
    height: 40,
  },
  productCategory: {
    paddingHorizontal: 24,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: '#fff',
  },
  detailsContainer: {
    paddingHorizontal: 24,
    marginTop: 18,
    marginBottom: 18,
  },
  productPrice: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    letterSpacing: -0.5,
    color: '#000',
    marginBottom: 18,
  },

  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productLabel: {
    width: 80, // 고정된 너비 설정
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: '#909090',
  },
  productTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#000',
  },
  productStatus: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#000',
  },
  productDescription: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: '#000',
  },
  bidContainer: {
    paddingHorizontal: 24,
    marginTop: 28,
    marginBottom: 20,
  },
  bidLabel: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color:'#000',
    marginBottom : 8,
  },
  bidAmount: {
    fontFamily: 'Pretendard-Regular',
    fontSize:16,
    color:'#000',
  },
  recentPrice: {
    flexDirection: 'row',
    flexWrap: 'wrap',         // 여러 줄로 자동 배치되게 함
    justifyContent: 'space-between', // 항목 사이에 공간을 고르게 배치
  },
  recentBid: {
    borderColor: '#5DADE2', // 가장 최근 입찰의 테두리 색
    borderWidth: 1.5, // 테두리 두께
    backgroundColor: '#f9f9f9',
  },
  bidBlock: {
    width: '48%',            // 두 개씩 배치되도록 50%로 크기 설정 (간격 고려)
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bidInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidInput: {
    flex: 1,
    marginRight: 20, // 입력 칸과 버튼 간의 간격
    borderBottomWidth: 1, // 아래쪽에만 테두리 두께 설정
    borderBottomColor: '#C0C0C0', // 아래쪽 테두리 색상
    height: 44,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  button: {
    borderRadius: 50,
    padding: 6,
    width: '18%',
    alignItems: 'center',
    backgroundColor: '#5DADE2',
  },
  buttonText: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
  separator: {
    height: 6,
    backgroundColor: '#F6F6F6',
  },
});

export default ProductScreen;
