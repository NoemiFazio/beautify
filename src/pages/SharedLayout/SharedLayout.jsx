import styles from "./index.module.scss";
import Navbar from "../../components/Navbar";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router";
import Modal from "../../components/Modal/Modal";
import Footer from "../../components/Footer/Footer";

const SharedLayout = () => {
  const { userData, cartData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginBtnClick = async (e) => {
    dispatch({ type: "SET_LOGIN_MODAL_OFF" });
    dispatch({ type: "SET_LOGOUT" });
    navigate("/login");
  };

  // useEffect(() => {
  //   if (userData.loginModalVisibility === true) {
  //     window.document.body.style.overflowY = "hidden";
  //   } else {
  //     window.document.body.style.overflowY = "scroll";
  //   }
  // }, [userData.loginModalVisibility]);

  // const handleOnModalOverlayClick = () => {
  //   dispatch({ type: "SET_LOGIN_MODAL_OFF" });
  // };
  return (
    <>
      <Navbar />
      {userData.loginModalVisibility && userData.isLogged === false && (
        <Modal
          modalVisibilityTrue={userData.loginModalVisibility}
          page="sharedLayoutPage"
        >
          <h3>Devi prima effettuare il login!</h3>
          <button className={styles.modalBtn} onClick={onLoginBtnClick}>
            Login
          </button>
        </Modal>
      )}
      {/* {userData.loginModalVisibility && userData.isLogged === false && (
        <div
          className={styles.loginModalOverlay}
          onClick={handleOnModalOverlayClick}
        >
          <div
            className={`${styles.loginModal} ${
              userData.loginModalVisibility ? styles.active : ""
            }`}
          >
            <h3>Devi prima effettuare il login!</h3>
            <button className={styles.modalBtn} onClick={onLoginBtnClick}>
              Login
            </button>
          </div>
        </div>
      )} */}
      <Outlet />
      <Footer />
    </>
  );
};
export default memo(SharedLayout);
