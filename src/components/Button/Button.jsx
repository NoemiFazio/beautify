import styles from "./index.module.scss";

const Button = ({ handleOnClick, type = "", children }) => {
  return (
    <button
      onClick={handleOnClick}
      className={`${styles.Button} ${type === "cardBtn" && styles.cardBtn}`}
    >
      {children}
    </button>
  );
};

export default Button;
