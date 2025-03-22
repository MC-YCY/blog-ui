import styles from '../index.module.css'
import LoginBanner from '@/assets/images/login-banner.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn-tabs.tsx'
import FormLogin from './form-login.tsx';
import FormRegister from './form-register.tsx';

const LoginForm = () => {

  return <div className={styles.loginForm + ' bg-white dark:bg-gray-800 rounded-lg'}>
    <div className={styles.loginFormBanner}>
      <img src={LoginBanner} alt="" />
    </div>
    <div className={styles.loginFormContent}>
      <Tabs defaultValue="login">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="login">登录</TabsTrigger>
          <TabsTrigger value="register">注册</TabsTrigger>
        </TabsList>
        <TabsContent className={'overflow-auto'} value="login">
          <FormLogin></FormLogin>
        </TabsContent>
        <TabsContent className={'overflow-auto'} value="register">
          <FormRegister></FormRegister>
        </TabsContent>
      </Tabs>
    </div>
  </div>
}
export default LoginForm