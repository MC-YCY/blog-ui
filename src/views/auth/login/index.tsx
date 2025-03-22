import styles from './index.module.css';
import LoginForm from './components/form.tsx'
import {ThreeDMarqueeDemo} from './components/marquee.tsx'

const Login = () => {
  return (
    <div className="w-full h-screen position-relative">
      <div className={styles.content}>
        <LoginForm></LoginForm>
      </div>
      <ThreeDMarqueeDemo></ThreeDMarqueeDemo>
    </div>
  );
};
export default Login;