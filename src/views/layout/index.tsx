import { Outlet } from 'react-router-dom';
import Header from './components/header/index.tsx';
import WrapperBackground from '@/components/wrapper-background/wrapper-background.tsx'
import UserBtnListProvider from '@/provider/UserBtnList.provider.tsx'

const Layout = () => {
  return (
    <>
      <UserBtnListProvider></UserBtnListProvider>
      <WrapperBackground></WrapperBackground>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};
export default Layout;