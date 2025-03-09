import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/header/index.tsx';
import WrapperBackground from '@/components/wrapper-background/wrapper-background.tsx'

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home', { replace: true }); // 替换当前历史记录
  }, [navigate]);

  return (
    <>
      <WrapperBackground></WrapperBackground>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};
export default Layout;