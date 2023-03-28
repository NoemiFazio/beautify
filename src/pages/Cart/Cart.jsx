// import styles from "./index.module.scss";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BsPaypal, BsFillCreditCard2BackFill } from "react-icons/bs";
import { AiOutlineGooglePlus } from "react-icons/ai";
import styles from "./index.module.scss";
import Button from "../../components/Button/Button";

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state);

  const paymentmethods = [
    {
      name: "G-PAY",
      icon: <AiOutlineGooglePlus className={styles.icon} />,
    },
    {
      name: "PAYPAL",
      icon: <BsPaypal className={styles.icon} />,
    },
    {
      name: "CREDIT CARD",
      icon: <BsFillCreditCard2BackFill className={styles.icon} />,
    },
  ];
  const handleOnClickPay = () => {
    if (paymentMethod && cartData.cartList.length > 0) {
      navigate("/dashboard");
      dispatch({ type: "BUY_ITEMS" });
      dispatch({ type: "CLEAR_PRODUCT" });
      dispatch({ type: "SET_TRUE" });
      // console.log(cartData.purchasedList);

      dispatch({ type: "SET_PURCHASE_MODAL_ON" });
    } else {
      alert("Select a Pay Method please! or Insert products into the cart");
    }
  };

  // function getOccurrence(array, value) {
  //   return array.filter((v) => v === value).length;
  // }

  const handleOnRemoveClick = useCallback((index) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: index });
    // console.log(index);
    // console.log(cartData.cartList);
  }, []);

  const onBtnClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.Cart}>
      <div className={styles.titleDiv}>
        <h1>My Cart</h1>
      </div>
      <section className={styles.mainContent}>
        <div className={styles.cartList}>
          {cartData.cartList.length ? (
            cartData?.cartList
              // ?.filter((value, index, self) => self.indexOf(value) === index)
              .map((product, index) => (
                <div className={styles.cartEl} key={index}>
                  <span className={styles.imgSpan}>
                    <p onClick={() => handleOnRemoveClick(index)}>x</p>
                    <Link
                      to={`/products/${product.id}`}
                      className={styles.imgLink}
                    >
                      <img
                        src={product.api_featured_image}
                        alt={product.name}
                        className={styles.img}
                      />
                    </Link>
                  </span>

                  <span className={styles.priceSpan}>
                    <p>
                      {product.price_sign === null
                        ? `${product.price}0 €
          `
                        : `${product.price}0 ${product.price_sign
                            ?.split(`${product.price_sign}`)
                            ?.join("€")}`}
                    </p>
                  </span>
                </div>
              ))
          ) : (
            <div className={styles.emptyCartDiv}>
              <p>...is rather empty.</p>
              <Button name="Return home button" handleOnClick={onBtnClick}>
                Let's go shopping! 😉
              </Button>
              {/* <button className={styles.Btn} onClick={onBtnClick}>
                Shall we go shopping? 😉
              </button> */}
            </div>
          )}
        </div>

        {cartData.cartList.length >= 1 && (
          <div className={styles.paymentDiv}>
            <h3 className={styles.paymentMethodText}>Select payment method</h3>
            <div className={styles.paymentMethodsDiv}>
              {paymentmethods.map((item, index) => (
                <div
                  className={`${styles.paymentChoice} ${
                    paymentMethod === item.name && styles.active
                  }`}
                  key={index}
                >
                  <span className={styles.iconSpan}>{item.icon}</span>
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

            <div className={styles.cartTotalDiv}>
              <h3 className={styles.cartTotalText}>Tot</h3>
              <h3 className={styles.cartTotalText}>
                {cartData.cartList
                  .reduce((a, b) => a + Number(b.price), 0)
                  .toFixed(2)}
              </h3>
            </div>
            <div className={styles.btnDiv}>
              <Button name="Pay button" handleOnClick={handleOnClickPay}>
                PAY
              </Button>
              {/* <button onClick={handleOnClickPay} className={styles.paymentBtn}>
                PAY
              </button> */}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default memo(Cart);
