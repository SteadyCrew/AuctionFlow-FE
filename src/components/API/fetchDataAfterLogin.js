import axios from 'axios';
import {BASE_URL} from '../../config/api';

export const fetchDataAfterLogin = async (url, token) => {
  try {
    console.log('API 요청 시작:', url, '토큰:', token);
    const response = await axios.get(`${BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
    });

    const data = response.data;

    // 데이터 포맷팅
    const formattedItems = data.map(item => ({
      id: item.itemId,
      image:
        item.productImageUrls[0] ||
        'https://archives.hangeul.go.kr/resource/template/images/img_none_01.png',
      title: item.title,
      price: `${item.startingBid.toLocaleString()}원`,
    }));

    return formattedItems;
  } catch (error) {
    console.error('데이터 가져오기 실패:', error.message); // 기본 메시지
    if (error.response) {
      // 서버 응답이 있는 경우
      console.error('서버 응답 데이터:', error.response.data);
      console.error('HTTP 상태 코드:', error.response.status);
      console.error('응답 헤더:', error.response.headers);
    } else if (error.request) {
      // 요청이 전송되었으나 응답을 받지 못한 경우
      console.error('요청 데이터:', error.request);
    } else {
      // 요청을 설정하는 동안 문제가 발생한 경우
      console.error('요청 설정 중 에러:', error.message);
    }
    console.error('요청 설정:', error.config); // Axios 요청 설정 정보

    return [];
  }
};
