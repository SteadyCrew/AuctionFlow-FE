import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import RegisterHeader from '../components/Headers/RegisterHeader';

const RegisterScreen = () => {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [isCategoryModalVisible, setCategoryModalVisibility] = useState(false);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [price, setPrice] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [isHourModalVisible, setHourModalVisibility] = useState(false);
  const [isMinuteModalVisible, setMinuteModalVisibility] = useState(false);

  const handleInputChange = (setter) => (value) => setter(value);

  const handleImageChange = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.error('ImagePicker Error: ', result.error);
    } else {
      setProductImages([...productImages, { uri: result.assets[0].uri }]);
    }
  };

  const handleImageDelete = (index) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setCalendarVisibility(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const now = new Date();
    const endDateTime = new Date(`${selectedDate}T${endHour}:${endMinute}:00`);

    if (!productName) newErrors.productName = '상품명을 입력하세요.';
    if (!selectedCategory || selectedCategory === "default") newErrors.category = '카테고리를 선택하세요.';
    if (!status) newErrors.status = '상품 상태를 선택하세요.';
    if (!description) newErrors.description = '설명을 입력하세요.';
    if (!price) newErrors.price = '가격을 입력하세요.';
    if (price <= 0) newErrors.price = '가격은 0보다 커야 합니다.';
    if (!selectedDate || !endHour || !endMinute) {
      newErrors.endDate = '종료 날짜와 시간을 입력하세요.';
    } else if (endDateTime <= now) {
      newErrors.endDate = '종료 시간은 현재 시간 이후여야 합니다.';
    }
    if (productImages.length === 0) newErrors.productImages = '상품 이미지를 추가하세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('http://3.35.1.149:8080/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: getCategoryID(category),
          title: productName,
          productStatus: status,
          description: description,
          startingBid: parseFloat(price),
          auctionEndTime: formatDateTime(endDate, endHour, endMinute),
          itemBidStatus: 'active',
          productImages,  // 이미지 URI 목록을 포함하여 전송
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // 응답 내용을 텍스트로 가져오기
        console.error('서버 오류 응답:', errorText); // 에러 로그에 출력
        throw new Error(`서버와의 통신에 실패했습니다. 상태 코드: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('등록 성공:', result);
      resetForm();
      navigation.navigate('Home');
    } catch (error) {
      console.error('등록 실패:', error); // 에러 메시지 출력
      Alert.alert('오류', '서버와의 통신에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const resetForm = () => {
    setProductName('');
    setSelectedCategory("default");
    setStatus('');
    setDescription('');
    setPrice('');
    setSelectedDate('');
    setEndHour('');
    setEndMinute('');
    setProductImages([]);
    setErrors({});
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisibility(false);
  };

  const toggleCalendar = () => {
    setCalendarVisibility(!isCalendarVisible);
  };

  const toggleHourModal = () => {
    setHourModalVisibility(!isHourModalVisible);
  };

  const toggleMinuteModal = () => {
    setMinuteModalVisibility(!isMinuteModalVisible);
  };

  const handleHourSelect = (hour) => {
    setEndHour(hour);
    setHourModalVisibility(false);
  };

  const handleMinuteSelect = (minute) => {
    setEndMinute(minute);
    setMinuteModalVisibility(false);
  };


  return (
    <ScrollView style={styles.container}>
      <RegisterHeader onDelete={resetForm} onRegister={handleSubmit}/>
      <View style={styles.formImageGroup}>
        <TouchableOpacity onPress={handleImageChange} style={styles.imageUploadPlaceholder}>
          <Text style={styles.uploadText}>이미지 등록</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.imageScrollContainer}>
          {productImages.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <TouchableOpacity onPress={() => handleImageDelete(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>&times;</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup}>
        <Text style={styles.label}>상품명</Text>
        <TextInput
          value={productName}
          onChangeText={handleInputChange(setProductName)}
          placeholder="상품명을 입력해주세요."
          style={styles.input}
        />
        {errors.productName && <Text style={styles.errorMessage}>{errors.productName}</Text>}
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup}>
        <Text style={styles.label}>카테고리</Text>
        <TouchableOpacity onPress={() => setCategoryModalVisibility(true)}>
            <Text style = {styles.input}>{selectedCategory === "default" ? '선택해주세요' : selectedCategory}</Text>
        </TouchableOpacity>
        {errors.category && <Text style={styles.errorMessage}>{errors.category}</Text>}
      </View>
      <View style={styles.separator} />
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>상품 상태</Text>
        {['새 상품(미개봉)', '사용감 없음', '사용감 적음', '사용감 많음', '고장 및 파손 상품'].map((value) => (
          <TouchableOpacity key={value} onPress={() => setStatus(value)} style={styles.radioOption}>
            <View style={styles.radioCircle}>
              {status === value && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>{value}</Text>
          </TouchableOpacity>
        ))}
        {errors.status && <Text style={styles.errorMessage}>{errors.status}</Text>}
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup}>
        <Text style={styles.label}>설명</Text>
        <TextInput
          value={description}
          onChangeText={handleInputChange(setDescription)}
          placeholder="상품 상세 설명을 적어주세요."
          style={[styles.input, styles.textArea]}
          multiline
        />
        {errors.description && <Text style={styles.errorMessage}>{errors.description}</Text>}
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup}>
        <Text style={styles.label}>가격</Text>
        <View style={styles.priceInputContainer}>
          <TextInput
            keyboardType="numeric"
            value={price}
            onChangeText={handleInputChange(setPrice)}
            placeholder="가격을 입력해주세요."
            style={styles.priceinput}
          />
          <Text style={styles.priceLabel}>원</Text>
        </View>
        {errors.price && <Text style={styles.errorMessage}>{errors.price}</Text>}
      </View>
      <View style={styles.separator} />

      {/* 입찰 마감 시간 */}
      <View style={styles.formGroup2}>
        <Text style={styles.label}>입찰 마감 시간</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity onPress={toggleCalendar} style={styles.datePicker}>
            <Text>{selectedDate || '날짜 선택'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleHourModal} style={styles.timePicker}>
            <Text>{endHour || '시 선택'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMinuteModal} style={styles.timePicker}>
            <Text>{endMinute || '분 선택'}</Text>
          </TouchableOpacity>
        </View>
        {errors.endDate && <Text style={styles.errorMessage}>{errors.endDate}</Text>}
      </View>
      <View style={styles.separator} />


      <Modal visible={isCategoryModalVisible} transparent>
          <View style={styles.catemodalContainer}>
              <View style={styles.catemodalContent}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {[
                      { label: '의류', value: 'clothing' },
                      { label: '패션 액세서리', value: 'fashion-accessories' },
                      { label: '전자기기', value: 'electronics' },
                      { label: '스포츠/레저', value: 'sports-leisure' },
                      { label: '차량/오토바이', value: 'vehicles' },
                      { label: '스타굿즈', value: 'star-goods' },
                      { label: '음반/악기', value: 'music-instruments' },
                      { label: '도서/티켓/문구', value: 'books-tickets-stationery' },
                      { label: '뷰티/미용', value: 'beauty' },
                      { label: '가구/인테리어', value: 'furniture-home' },
                      { label: '생활/주방용품', value: 'home-kitchen' },
                      { label: '공구/산업용품', value: 'tools-industrial' },
                      { label: '식품', value: 'food' },
                      { label: '유아동/출산', value: 'baby-kids' },
                      { label: '반려동물 용품', value: 'pet-supplies' },
                      { label: '기타', value: 'others' },
                    ].map((category) => (
                      <TouchableOpacity
                        key={category.value}
                        onPress={() => handleCategorySelect(category.label)}
                        style={styles.categoryOption}
                      >
                        <Text style={styles.categoryText}>{category.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                  <TouchableOpacity onPress={() => setCategoryModalVisibility(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>닫기</Text>
                  </TouchableOpacity>
              </View>
          </Modal>


      {/* 달력 모달 */}
      <Modal visible={isCalendarVisible} transparent>
        <View style={styles.calmodalContainer}>
          <View style={styles.calmodalContent}>
          <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                  [selectedDate]: { 
                    selected: true, 
                    marked: true, 
                    selectedColor: '#5DADE2' // 선택된 날짜의 배경색
                  },
                }}
                theme={{
                  // 달력 스타일 설정
                  todayTextColor: '#5DADE2',
                  dayTextColor: 'black', // 날짜 텍스트 색상
                  selectedDayBackgroundColor: '#5DADE2',
                  selectedDayTextColor: 'white',
                  monthTextColor: 'black',
                  textDayFontFamily: 'Pretendard-Regular',
                  textMonthFontFamily: 'Pretendard-Bold', // 월 텍스트 폰트
                  textDayFontSize: 12, // 날짜 텍스트 크기
                  textMonthFontSize: 16, // 월 텍스트 크기
                }}
              />
          </View>
            <TouchableOpacity onPress={toggleCalendar} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
        </View>
      </Modal>

      {/* 시간 선택 모달 */}
      <Modal visible={isHourModalVisible} transparent>
        <View style={styles.timemodalContainer}>
            <View style={styles.timemodalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {[...Array(24).keys()].map((hour) => (
                <TouchableOpacity key={hour} onPress={() => handleHourSelect(hour.toString().padStart(2, '0'))} style={styles.timemodalItem}>
                  <Text style={styles.timemodalText}>{hour.toString().padStart(2, '0')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
              <TouchableOpacity onPress={toggleHourModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
        </View>
      </Modal>

      {/* 분 선택 모달 */}
      <Modal visible={isMinuteModalVisible} transparent>
        <View style={styles.timemodalContainer}>
          <View style={styles.timemodalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {[...Array(60).keys()].map((minute) => (
                <TouchableOpacity key={minute} onPress={() => handleMinuteSelect(minute.toString().padStart(2, '0'))} style={styles.timemodalItem}>
                  <Text style={styles.timemodalText}>{minute.toString().padStart(2, '0')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
            <TouchableOpacity onPress={toggleMinuteModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, // 전체화면

  formGroup: {
    paddingHorizontal: 24,
    marginVertical: 20,
  }, // 상품명, 카테고리, 상품 상태, 설명, 가격
  formGroup2: {
    marginVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 40,
  }, // 입찰 마감 시간

  label: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 14,
  }, // 대분류
  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 12,
    height: 44,
    borderRadius: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  }, // 입력
  textArea: {
    height: 160,
    textAlignVertical: 'top', 
  }, // 설명 입력

  //이미지
  formImageGroup: { // 이미지 그룹폼
    paddingHorizontal: 24,
    paddingTop:40,
  },
  imageUploadPlaceholder: { // 이미지 네모박스
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#c4c4c4',
  },
  uploadText: { // 이미지 등록 텍스트
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#555',
  },
  imageWrapper: { // 각 이미지
    position: 'relative',
    marginRight: 8,
    marginTop: 8,
  },
  image: { // 이미지
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A3A3A3',
  },
  imageScrollContainer: { // 이미지 여러장 시 스크롤에 대한 스타일
    marginBottom: 12,
  },  
// 이미지 삭제 버튼 스타일
deleteButton: {
  position: 'absolute',
  top: -2, // 이미지 상단에서 약간 위로
  right: -2, // 이미지 오른쪽에서 약간 바깥으로
  backgroundColor: '#000000',
  borderRadius: 50, // 원형으로 만들기
  width: 22, // 원하는 원형 버튼 크기
  height: 22, // 원하는 원형 버튼 크기
  justifyContent: 'center', // 버튼 내 텍스트 중앙 정렬
  alignItems: 'center', // 버튼 내 텍스트 중앙 정렬
},
deleteButtonText: {
  color: '#fff',
  fontSize: 14, // 버튼 내 텍스트 크기 조정
},

  //카테고리 모달
  catemodalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  catemodalContent: {
    width: '90%',
    maxHeight: '50%', // 모달 최대 높이 제한
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: '30%',
  },
  categoryOption: {
    paddingVertical: 6,// 카테고리 별 간격
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 17,
    color : '#555',
  },
  closeButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  closeButtonText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  radioCircle: {
    height: 14,
    width: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#909090',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#000',
  },

  priceLabel: {
    fontFamily: 'Pretendard-SemiBold',
    marginLeft: 15, // 입력 필드와의 간격 조정
    right:5,
    top: 10,
    fontSize: 18,
    color: '#000',
  },
  priceInputContainer: {
    flexDirection: 'row',
  },
  priceinput:{
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 12,
    height: 44,
    borderRadius: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    flex:1,
  },

  //날짜 입력
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  calmodalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calmodalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },

  timePicker: {
    width: 100,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  timemodalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  timemodalContent: {
    width: '30%',
    maxHeight: '60%', // 모달 최대 높이 제한
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  timemodalItem: {
    paddingVertical: 6,// 카테고리 별 간격
    alignItems: 'center',
  },
  timemodalText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 17,
    color : '#555',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily:'Pretendard-Light',
  },
  separator: {
    height: 6,
    backgroundColor: '#F6F6F6',
  },
});

export default RegisterScreen;