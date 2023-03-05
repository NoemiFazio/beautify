import styles from "./index.module.scss";
import Navbar from "../../components/Navbar";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router";
import Modal from "../../components/Modal/Modal";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";

const SharedLayout = () => {
  const { userData, cartData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginBtnClick = async (e) => {
    dispatch({ type: "SET_LOGIN_MODAL_OFF" });
    dispatch({ type: "SET_LOGOUT" });
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      {userData.loginModalVisibility && userData.isLogged === false && (
        <Modal
          modalVisibilityTrue={userData.loginModalVisibility}
          page="sharedLayoutPage"
        >
          <h3>Devi prima effettuare il login!</h3>
          <Button handleOnClick={onLoginBtnClick}>Login</Button>
        </Modal>
      )}
      <Outlet />
      <Footer />
    </>
  );
};
export default memo(SharedLayout);
