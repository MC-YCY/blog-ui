import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'

const RouterLocationProvider = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 使用 useLayoutEffect 同步更新 title
  useEffect(() => {
    if(location.pathname === '/'){
      navigate('/home', { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default RouterLocationProvider;
