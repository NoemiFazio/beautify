// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { BsPaypal, BsFillCreditCard2BackFill } from "react-icons/bs";
import { AiOutlineGooglePlus } from "react-icons/ai";
import styles from "./index.module.scss";

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state);

  const paymentmethods = [
    {
      name: "CREDIT CARD / DEBIT CARD",
      icon: <BsFillCreditCard2BackFill className={styles.icon} />,
    },
    {
      name: "PAYPAL",
      icon: <BsPaypal className={styles.icon} />,
    },
    {
      name: "G-PAY",
      icon: <AiOutlineGooglePlus className={styles.icon} />,
    },
  ];
  const handleOnClickPay = () => {
    console.log(paymentMethod);
    if (paymentMethod && cartData.cartList.length > 0) {
      dispatch({ type: "BUY_ITEMS" });
      dispatch({ type: "CLEAR_PRODUCT" });
      dispatch({ type: "SET_TRUE" });
      dispatch({ type: "SET_PURCHASE_MODAL_ON" });
      navigate("/dashboard");
    } else {
      alert("Select a Pay Method please! or Insert products into the cart");
    }
  };

  return (
    <div className={styles.Cart}>
      <div className={styles.titleDiv}>
        <h2>My</h2>
        <h2>Cart</h2>
      </div>
      <div className={styles.cartList}>
        {cartData.cartList.length ? (
          cartData?.cartList?.map((product, index) => (
            <p key={index}>{product.name}</p>
          ))
        ) : (
          <p>Cart empty</p>
        )}
      </div>
      <div className={styles.totalDiv}>
        <span>TOT</span>
        <span>Millemila euri</span>
      </div>
      <div className={styles.paymentMethodsDiv}>
        {paymentmethods.map((item, index) => (
          <div className={styles.paymentChoice} key={index}>
            <span>{item.icon}</span>
            <span
              onClick={() => setPaymentMethod(item.name)}
              className={`${styles.paymentMethod} ${
                paymentMethod === item.name && styles.active
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <button onClick={handleOnClickPay} className={styles.paymentBtn}>
        PAY
      </button>
    </div>
  );
};

export default memo(Cart);
