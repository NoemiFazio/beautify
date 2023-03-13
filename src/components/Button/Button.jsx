import styles from "./index.module.scss";
import { forwardRef } from "react";

const Button = forwardRef((props, ref) => {
  return (
    <button
      onClick={props.handleOnClick}
      className={`${styles.Button} ${
        props.type === "cardBtn" && styles.cardBtn
      } ${props.type === "loadBtn" && styles.loadBtn} ${
        props.isActive && styles.loadBtnActive
      }`}
      disabled={props.disabled}
      ref={ref}
      style={props.style}
    >
      {props.children}
    </button>
  );
});
export default Button;
