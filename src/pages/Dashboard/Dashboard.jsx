// import styles from "./index.module.scss";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";
import Modal from "../../components/Modal";
import Carousel from "../../components/Carousel/Carousel";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { makeupData, cartData } = useSelector((state) => state);

  // const handleOnModalOverlayClick = () => {
  //   dispatch({ type: "SET_PURCHASE_MODAL_OFF" });
  // };

  useEffect(() => {
    if (cartData.purchaseModalVisibility) {
      setTimeout(() => {
        dispatch({ type: "SET_PURCHASE_MODAL_OFF" });
        // window.document.body.style.overflowY = "scroll";
      }, 2500);
      // window.document.body.style.overflowY = "hidden";
      // setTimeout(() => {
      //   setStatus("")
      // }, 1500)
    }
  }, [cartData.purchaseModalVisibility]);

  const onBtnClick = () => {
    navigate("/");
  };
  // function getOccurrence(array, value) {
  //   return array.filter((v) => v === value).length;
  // }

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
            <h1 className={styles.userName}>
              {localStorage.getItem("username")}
              <span>,</span>
            </h1>
            welcome back!
          </h1>
          <Button handleOnClick={onBtnClick}>Let's go shopping! 😉</Button>
        </section>
      )}
      {/* <h3>La tua lista dei preferiti:</h3> */}
      <section className={styles.personalSection}>
        {
          makeupData.favourites.length >= 1 && (
            <Carousel data={makeupData?.favourites} type={"favourites"} />
          )
          // ) : (
          //   <p>Lista vuota</p>
          // )
        }
        {/* <h3>La tua lista dei preferiti:</h3> */}
        {/* <div>
        {makeupData.favourites.length ? (
          makeupData?.favourites?.map((favourite, index) => (
            <p key={index}>{favourite.name}</p>
          ))
        ) : (
          <p>Lista vuota</p>
        )}
      </div> */}
        {/* <h3>Nel tuo beauty case:</h3> */}

        {
          cartData.purchasedList.length >= 1 && (
            <Carousel data={cartData?.purchasedList} type={"beautycase"} />
          )
          // ) : (
          // cartData?.purchasedList
          //   ?.filter((value, index, self) => self.indexOf(value) === index)
          //   .map((purchase, index) => (
          //     <p key={index}>
          //       {purchase.name} x
          //       {getOccurrence(cartData.purchasedList, purchase)}
          //     </p>
          //   ))
          //   <p>Lista vuota</p>
          // )
        }

        {/* <h3>Nel tuo beauty case:</h3>
      <div>
        {cartData.purchasedList.length ? (
          cartData?.purchasedList
            ?.filter((value, index, self) => self.indexOf(value) === index)
            .map((purchase, index) => (
              <p key={index}>
                {purchase.name} x
                {getOccurrence(cartData.purchasedList, purchase)}
              </p>
            ))
        ) : (
          <p>Lista vuota</p>
        )}
      </div> */}
        {makeupData.viewed.length >= 1 && (
          <>
            {/* <h3>Viewed</h3> */}
            <Carousel data={makeupData?.viewed} type={"viewed"} />
          </>
        )}
      </section>
      {/* {makeupData.viewed.length >= 1 && (
        <>
          <h3>Cos'hai visto:</h3>
          <div>
            {makeupData.viewed.length ? (
              makeupData?.viewed?.map((obj, index) => (
                <p key={index}>{obj.name}</p>
              ))
            ) : (
              <p>Lista vuota</p>
            )}
          </div>
        </>
      )} */}
    </div>
  );
};

export default memo(Dashboard);
