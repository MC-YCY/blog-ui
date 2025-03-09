import { Outlet } from 'react-router-dom';
import Header from './components/header/index.tsx';
import WrapperBackground from '@/components/wrapper-background/wrapper-background.tsx'

const Layout = () => {
  return (
    <>
      <WrapperBackground></WrapperBackground>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};
export default Layout;