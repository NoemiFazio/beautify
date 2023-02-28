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
    if (paymentMethod && cartData.cartList.length > 0) {
      dispatch({ type: "BUY_ITEMS" });
      dispatch({ type: "CLEAR_PRODUCT" });
      dispatch({ type: "SET_TRUE" });
      // console.log(cartData.purchasedList);

      navigate("/dashboard");
      dispatch({ type: "SET_PURCHASE_MODAL_ON" });
    } else {
      alert("Select a Pay Method please! or Insert products into the cart");
    }
  };

  // function getOccurrence(array, value) {
  //   return array.filter((v) => v === value).length;
  // }

  const handleOnRemoveClick = (index) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: index });
    console.log(index);
    console.log(cartData.cartList);
  };

  return (
    <div className={styles.Cart}>
      <section className={styles.mainContent}>
        <div className={styles.titleDiv}>
          <h2>My Cart</h2>
        </div>
        <div className={styles.cartList}>
          {cartData.cartList.length ? (
            cartData?.cartList
              // ?.filter((value, index, self) => self.indexOf(value) === index)
              .map((product, index) => (
                <div className={styles.cartEl} key={index}>
                  <span className={styles.nameSpan}>
                    <p onClick={() => handleOnRemoveClick(index)} key={index}>
                      x
                    </p>
                    {product.name}
                  </span>

                  <span className={styles.priceSpan}>
                    {product.price_sign === null
                      ? `${product.price}0 €
          `
                      : `${product.price}0 ${product.price_sign
                          ?.split(`${product.price_sign}`)
                          ?.join("€")}`}
                  </span>
                </div>
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
      </section>
    </div>
  );
};

export default memo(Cart);
