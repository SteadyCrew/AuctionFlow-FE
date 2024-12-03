import axios from 'axios';
import {BASE_URL} from '../../config/api';

export const getData = async url => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`); // BASE_URL로 URL 구성
    const data = response.data;
    console.log(data);

    // 데이터 포맷팅
    const formattedItems = data.map(item => ({
      id: item.itemId,
      image:
        item.productImageUrls[0] ||
        'https://archives.hangeul.go.kr/resource/template/images/img_none_01.png', // 기본 이미지 사용
      title: item.title,
      price: `${item.currentBid ? item.currentBid.toLocaleString() : 0}원`, // 가격 포맷팅
      itemBidStatus: item.itemBidStatus,
    }));

    return formattedItems;
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};
