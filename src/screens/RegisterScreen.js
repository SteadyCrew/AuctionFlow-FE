import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Calendar } from 'react-native-calendars';

const RegisterScreen = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [price, setPrice] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isCalendarVisible, setCalendarVisibility] = useState(false);

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
    setProductImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setCalendarVisibility(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const now = new Date();

    const endDateTime = new Date(`${endDate}T${endHour}:${endMinute}:00`);

    if (!productName) newErrors.productName = '상품명을 입력하세요.';
    if (!category) newErrors.category = '카테고리를 선택하세요.';
    if (!status) newErrors.status = '상품 상태를 선택하세요.';
    if (!description) newErrors.description = '설명을 입력하세요.';
    if (!price) newErrors.price = '가격을 입력하세요.';
    if (price <= 0) newErrors.price = '가격은 0보다 커야 합니다.';

    if (!endDate || !endHour || !endMinute) {
      newErrors.endDate = '종료 시간을 입력하세요.';
    } else if (endDateTime <= now) {
      newErrors.endDate = '종료 시간은 현재 시간 이후여야 합니다.';
    }

    if (productImages.length === 0) newErrors.productImages = '상품 이미지를 추가하세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const endDateTime = new Date(`${selectedDate}T${endHour}:${endMinute}:00`);
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    Alert.alert("등록 완료", "상품이 성공적으로 등록되었습니다.");
    resetForm();
    setLoading(false);
  };

  const resetForm = () => {
    setProductName('');
    setCategory('');
    setStatus('');
    setDescription('');
    setPrice('');
    setEndDate('');
    setEndHour('');
    setEndMinute('');
    setProductImages([]);
    setErrors({});
  };

  const toggleCalendar = () => {
    setCalendarVisibility(!isCalendarVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formImageGroup}>
        {productImages.length === 0 ? (
          <TouchableOpacity onPress={handleImageChange} style={styles.imageUploadPlaceholder}>
            <Text style={styles.uploadText}>이미지 등록</Text>
          </TouchableOpacity>
        ) : (
          <ScrollView horizontal>
            {productImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <TouchableOpacity onPress={() => handleImageDelete(index)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>&times;</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={handleImageChange} style={styles.imageUploadBoxItem}>
              <Text style={styles.uploadText}>+</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
        {errors.productImages && <Text style={styles.errorMessage}>{errors.productImages}</Text>}
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup}>
        <Text style={styles.label}>상품명</Text>
        <TextInput
          value={productName}
          onChangeText={handleInputChange(setProductName)}
          placeholder="상품명을 입력하세요."
          style={styles.input}
        />
        {errors.productName && <Text style={styles.errorMessage}>{errors.productName}</Text>}
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup}>
        <Text style={styles.label}>카테고리</Text>
        <Picker
          selectedValue={category}
          onValueChange={handleInputChange(setCategory)}
          style={styles.picker}
        >
          <Picker.Item label="선택하세요" value="" />
          <Picker.Item label="의류" value="clothing" />
          <Picker.Item label="패션 액세서리" value="fashion-accessories" />
          <Picker.Item label="전자기기" value="electronics" />
          <Picker.Item label="스포츠/레저" value="sports-leisure" />
          <Picker.Item label="차량/오토바이" value="vehicles" />
          <Picker.Item label="스타굿즈" value="star-goods" />
          <Picker.Item label="음반/악기" value="music-instruments" />
          <Picker.Item label="도서/티켓/문구" value="books-tickets-stationery" />
          <Picker.Item label="뷰티/미용" value="beauty" />
          <Picker.Item label="가구/인테리어" value="furniture-home" />
          <Picker.Item label="생활/주방용품" value="home-kitchen" />
          <Picker.Item label="공구/산업용품" value="tools-industrial" />
          <Picker.Item label="식품" value="food" />
          <Picker.Item label="유아동/출산" value="baby-kids" />
          <Picker.Item label="반려동물 용품" value="pet-supplies" />
          <Picker.Item label="기타" value="others" />
        </Picker>
        {errors.category && <Text style={styles.errorMessage}>{errors.category}</Text>}
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup}>
        <Text style={styles.label}>상품 상태</Text>
        {['새 상품(미개봉)', '사용감 없음', '사용감 적음', '사용감 많음', '고장 및 파손 상품'].map((value) => (
          <TouchableOpacity 
            key={value} 
            onPress={() => setStatus(value)} 
            style={styles.radioOption}
          >
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
            placeholder="가격을 입력하세요."
            style={styles.input}
          />
          <Text style={styles.priceLabel}>원</Text>
        </View>
        {errors.price && <Text style={styles.errorMessage}>{errors.price}</Text>}
      </View>
      <View style={styles.separator} />

      <View style={styles.formGroup2}>
        <Text style={styles.label}>종료 날짜</Text>
        <TouchableOpacity onPress={toggleCalendar} style={styles.input}>
          <Text>{selectedDate || '날짜 선택'}</Text>
        </TouchableOpacity>

        {/* 모달 UI */}
        <Modal
          visible={isCalendarVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleCalendar}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
              <TouchableOpacity onPress={toggleCalendar} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.timeContainer}>
          <TextInput
            value={endHour}
            onChangeText={setEndHour}
            placeholder="HH"
            style={styles.timeInput}
            keyboardType="numeric"
          />
          <TextInput
            value={endMinute}
            onChangeText={setEndMinute}
            placeholder="MM"
            style={styles.timeInput}
            keyboardType="numeric"
          />
        </View>
        {errors.endDate && <Text style={styles.errorMessage}>{errors.endDate}</Text>}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  formImageGroup: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  formGroup: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  formGroup2: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 80,
  },
  label: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 12,
    height: 44,
    borderRadius: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 12,
    height: 160,
    borderRadius: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top', 
  },  
  picker: {
    borderWidth: 1,
    borderColor: '#A3A3A3',
    borderRadius: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#909090',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#949494',
  },
  imageUploadPlaceholder: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 6,
    borderColor: '#c4c4c4',
  },
  uploadText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    color: '#555',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A3A3A3',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  imageUploadBoxItem: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A3A3A3',
  },
  priceLabel: {
    position: 'absolute',
    fontFamily: 'Pretendard-SemiBold',
    right: 10,
    top: 10,
    fontSize: 18,
    color: '#000',
  },
  priceInputContainer: {
    flexDirection: 'row',
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 12,
    height: 44,
    borderRadius: 10,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#5DADE2',
    borderRadius: 20,
    height: 30,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  closeButtonText: {
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
    color: '#fff',
    fontSize: 14,
    lineHeight: 30,
    textAlign: 'center',
  },
  separator: {
    height: 8,
    backgroundColor: '#F6F6F6',
  },
});

export default RegisterScreen;