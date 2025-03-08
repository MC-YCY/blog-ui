import styles from './index.module.css';
import LoginForm from './components/form.tsx'
import Sparkles from './components/sparkles.tsx'

const Login = () => {
  return (
    <div className="w-full h-screen position-relative">
      <div className={styles.banner}>
      </div>
      <div className={styles.content}>
        <LoginForm></LoginForm>
      </div>
      <div className={styles.sparkles}>
        <Sparkles></Sparkles>
      </div>
    </div>
  );
};
export default Login;