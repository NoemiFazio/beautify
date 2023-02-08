// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const Cart = () => {
  return (
    <div className={styles.Cart}>
      <div>Cart</div>
    </div>
  );
};

export default memo(Cart);
