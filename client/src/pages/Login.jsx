import styles from "./Login.module.css";
import googleLogo from "../assets/google-logo.png"; // Place a Google logo in the assets folder

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h1>Welcome Back!</h1>
        <p>Login to continue your journey with us.</p>
      </div>
      <div className={styles.rightPanel}>
        <h2>Login</h2>
        <button className={styles.googleBtn}>
          <img
            src={googleLogo}
            alt="Google logo"
            className={styles.googleLogo}
          />
          Sign in with Google
        </button>
        <p>or</p>
        <input type="email" placeholder="Email" className={styles.input} />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <button className={styles.loginBtn}>Login</button>
        <p className={styles.signupText}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
