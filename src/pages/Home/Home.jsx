import styles from "../../../src/App.module.scss";
import MakeupList from "../../components/MakeupList";
import Slider from "../../components/Slider";
// import Navbar from "../../components/Navbar";
import FilterList from "../../components/FilterList";
import { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  const { filterStatus, userData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typeKey, setTypeKey] = useState("Nail polish");
  const [brandKey, setBrandKey] = useState("");

  const onLoginBtnClick = async (e) => {
    dispatch({ type: "SET_LOGIN_MODAL_OFF" });
    dispatch({ type: "SET_LOGOUT" });

    navigate("/login");
  };

  useEffect(() => {
    if (userData.loginModalVisibility === true) {
      window.document.body.style.overflowY = "hidden";
    } else {
      window.document.body.style.overflowY = "scroll";
    }
  }, [userData.loginModalVisibility]);

  const handleOverlayClick = () => {
    dispatch({ type: "CLOSE_FILTER_MENU" });
    dispatch({ type: "CLOSE_CATEGORY_LIST" });
  };

  const handleOnModalOverlayClick = () => {
    dispatch({ type: "SET_LOGIN_MODAL_OFF" });
  };

  return (
    <div className={styles.App}>
      {/* <Navbar /> */}

      <Slider />
      <FilterList setBrandKey={setBrandKey} setTypeKey={setTypeKey} />
      {userData.loginModalVisibility && userData.isLogged === false && (
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
      )}
      {(filterStatus.isFilterActive || filterStatus.isCategoryClicked) && (
        <div className={styles.overlay} onClick={handleOverlayClick}></div>
      )}
      {<MakeupList brandKey={brandKey} typeKey={typeKey} />}
      {/* {console.log("APP!!!")} */}
    </div>
  );
};

export default memo(Home);
