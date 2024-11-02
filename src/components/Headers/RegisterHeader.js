import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

function RegisterHeader({ onDelete,onRegister }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(true); // 모달을 띄움
  };

  const handleDelete = () => {
    onDelete(); // 내용을 삭제하는 함수 호출
    setModalVisible(false); // 모달 닫기
    navigation.goBack(); // 뒤로 가기
  };

  const handleCloseModal = () => {
    setModalVisible(false); // 모달 닫기
  };

  const handleRegister = () => {
    // 등록 로직 추가
    onRegister();
    console.log("등록 버튼 클릭");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleCancel}>
        <Icon name="close-outline" size={30} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerButton}>등 록</Text>
      </TouchableOpacity>

      {/* 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>지금까지 작성하신 글이 전부 사라집니다.{"\n"}정말 삭제 하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={[styles.deleteButton]}>
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#5DADE2',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    paddingHorizontal: 16,
    borderRadius: 20,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '84%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 30,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  deleteButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#5DADE2',
  },
  modalButtonText: {
    fontFamily: 'Pretendard-Regular',
    color: '#000',
  },
  deleteButtonText: {
    fontFamily: 'Pretendard-Regular',
    color: '#fff',
  },
});

export default RegisterHeader;
