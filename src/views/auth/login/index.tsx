import styles from './index.module.css';
import LoginForm from './components/form.tsx'

const Login = () => {
  return (
    <div className="w-full h-screen position-relative">
      <div className={styles.content}>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};
export default Login;