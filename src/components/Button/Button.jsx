import styles from "./index.module.scss";
import { forwardRef, memo } from "react";

const Button = forwardRef((props, ref) => {
  return (
    <button
      type={props.name}
      aria-label={props.name}
      aria-required="true"
      name={props.name}
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
export default memo(Button);
