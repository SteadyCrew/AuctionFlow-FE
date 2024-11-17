import axios from 'axios';
import {BASE_URL} from '../config/api';

export const fetchDataAfterLogin = async (url, token) => {
  try {
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
      price: `₩${item.startingBid.toLocaleString()}`,
    }));

    return formattedItems;
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    return [];
  }
};
