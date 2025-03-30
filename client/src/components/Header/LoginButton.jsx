import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.loginButton} onClick={() => navigate("/login")}>
      Login/Signup
    </button>
  );
};

export default LoginButton;
