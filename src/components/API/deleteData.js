import axios from 'axios';
import {BASE_URL} from '../../config/api';

// 삭제 요청 함수
export const deleteData = async (url, token, itemId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 토큰 추가
        'Content-Type': 'application/json', // JSON 형식의 body 명시
      },
      data: {
        itemId: itemId, // 삭제할 itemId 전달
      },
    });

    if (response.status === 200) {
      return true; // 삭제 성공
    } else {
      console.error('삭제 실패: 서버 응답 상태 코드:', response.status);
      return false; // 삭제 실패
    }
  } catch (error) {
    console.error('삭제 요청 실패:', error);
    throw new Error('삭제 요청 중 오류가 발생했습니다.');
  }
};
