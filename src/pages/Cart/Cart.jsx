// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state);

  return (
    <div className={styles.Cart}>
      <div>Cart</div>
      {cartData.cartList.length ? (
        cartData?.cartList?.map((product, index) => (
          <p key={index}>{product.name}</p>
        ))
      ) : (
        <p>Cart empty</p>
      )}
    </div>
  );
};

export default memo(Cart);
