import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/header/index.tsx';

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home', { replace: true }); // 替换当前历史记录
  }, [navigate]);

  return (
    <>
      <Header></Header>
      <div className='max-w-[84rem] w-full mx-auto  relative z-20'>
        <Outlet></Outlet>
      </div>
    </>
  );
};
export default Layout;