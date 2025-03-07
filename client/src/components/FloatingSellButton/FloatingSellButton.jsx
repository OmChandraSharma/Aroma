import styles from "./FloatingSellButton.module.css";

const FloatingSellButton = () => {
  return (
    <button className={styles.sellButton}>
      <div className={styles.original}>+Sell</div>
      <div className={styles.letters}>
        <span>+</span>
        <span>S</span>
        <span>E</span>
        <span>L</span>
        <span>L</span>
      </div>
    </button>
  );
};

export default FloatingSellButton;
