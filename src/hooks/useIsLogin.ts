import { useEffect, useState } from 'react';
import { STORAGE_KEY } from '@/constants/storageKey';

const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.accessToken);
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return isLogin;
};

export default useIsLogin;
