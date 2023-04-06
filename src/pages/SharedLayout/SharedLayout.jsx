import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Modal from "../../components/Modal/Modal";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import ArrowUp from "../../components/ArrowUp/ArrowUp";
import Navbar from "../../components/Navbar";

const SharedLayout = () => {
  const { userData } = useSelector((state) => state);

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
          <h3>Sign up first!</h3>
          <Button name="Login button" handleOnClick={onLoginBtnClick}>
            Login
          </Button>
        </Modal>
      )}
      <ArrowUp />
      <Outlet />
      <Footer />
    </>
  );
};
export default memo(SharedLayout);
