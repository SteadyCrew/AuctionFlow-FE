import {useState, useEffect} from 'react';
import axios from 'axios';

// 재사용 가능한 GET API 함수
export const useGetAPI = url => {
  const [data, setData] = useState(null); // 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        const response = await axios.get(url);
        setData(response.data); // 데이터 설정
        setError(null); // 에러 초기화
      } catch (err) {
        setError(err.message); // 에러 발생 시 에러 상태 업데이트
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, [url]);

  return {data, loading, error}; // 세 가지 상태 반환
};
