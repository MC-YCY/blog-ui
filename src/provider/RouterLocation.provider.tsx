import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { routeMap } from "@/constant/routers.ts";

const RouterLocationProvider = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 预计算路由映射表（仅计算一次）
  useEffect(() => {
    if(location.pathname === '/'){
      navigate('/home', { replace: true });
    }
    const matchedMeta = routeMap.get(location.pathname);
    document.title = matchedMeta?.title || "Blog";
  }, [location, routeMap, navigate]);

  return null;
};

export default RouterLocationProvider;
