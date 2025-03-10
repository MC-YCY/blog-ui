import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { routeMap } from "@/constant/routers.ts";

const RouterLocationProvider = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 使用 useLayoutEffect 同步更新 title
  useLayoutEffect(() => {
    if(location.pathname === '/'){
      navigate('/home', { replace: true });
    }
    const matchedMeta = routeMap.get(location.pathname);
    document.title = matchedMeta?.title || "Blog";
  }, [location, navigate]);

  return null;
};

export default RouterLocationProvider;
