import styles from "./index.module.scss";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Modal from "../../components/Modal";
import Carousel from "../../components/Carousel/Carousel";
import Button from "../../components/Button/Button";

const Dashboard = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { makeupData, cartData } = useSelector((state) => state);

  useEffect(() => {
    if (cartData.purchaseModalVisibility) {
      setTimeout(() => {
        dispatch({ type: "SET_PURCHASE_MODAL_OFF" });
      }, 2500);
    }
  }, [cartData.purchaseModalVisibility]);

  const onBtnClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.Dashboard}>
      {cartData.purchaseModalVisibility && (
        <Modal modalVisibilityTrue={cartData.purchaseModalVisibility}>
          <h3>Grazie per l'acquisto 💋</h3>
        </Modal>
      )}
      {makeupData.favourites.length >= 1 ||
      cartData.purchasedList.length >= 1 ||
      makeupData.viewed.length >= 1 ? (
        ""
      ) : (
        <section className={styles.initialSection}>
          <h1 className={styles.userWelcome}>
            <span className={styles.userName}>
              {localStorage.getItem("username")}
              <span>, </span>
            </span>
            welcome back!
          </h1>
          <Button name="Return home button" handleOnClick={onBtnClick}>
            Let's go shopping! 😉
          </Button>
        </section>
      )}

      <section className={styles.personalSection}>
        {makeupData.favourites.length >= 1 && (
          <Carousel data={makeupData?.favourites} type={"favourites"} />
        )}

        {cartData.purchasedList.length >= 1 && (
          <Carousel data={cartData?.purchasedList} type={"beautycase"} />
        )}

        {makeupData.viewed.length >= 1 && (
          <>
            <Carousel data={makeupData?.viewed} type={"viewed"} />
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
