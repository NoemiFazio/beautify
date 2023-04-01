import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, memo } from "react";
import { useNavigate } from "react-router";
import { BsCart4 } from "react-icons/bs";
import { BurgerSexy } from "react-burger-icons";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const { navbarStatus, cartData, userData } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleHamOnClick = () => {
    dispatch({ type: "OPEN_MENU" });
    if (navbarStatus.isActive === true) {
      dispatch({ type: "CLOSE_MENU" });
    }
  };

  const handleLogoutOnClick = () => {
    dispatch({ type: "OPEN_MENU" });
    if (navbarStatus.isActive === true) {
      dispatch({ type: "SET_LOGOUT" });
      dispatch({ type: "CLOSE_MENU" });
      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "CLEAR_PRODUCT" });
      dispatch({ type: "CLEAR_PURCHASED_LIST" });
      dispatch({ type: "CLEAR_FAVOURITES" });
      dispatch({ type: "SET_LOGIN_MODAL_OFF" });
      dispatch({ type: "SET_PURCHASE_MODAL_OFF" });

      navigate("/");
    }
  };

  //Nuovo useEffect per far si che , se isLogged è falso al refresh, fa tutte quelle
  //cose scritte sotto
  useEffect(() => {
    if (userData.isLogged === false) {
      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "CLEAR_PRODUCT" });
      dispatch({ type: "CLEAR_PURCHASED_LIST" });
      dispatch({ type: "CLEAR_FAVOURITES" });
      dispatch({ type: "SET_LOGIN_MODAL_OFF" });
      dispatch({ type: "SET_PURCHASE_MODAL_OFF" });
      dispatch({ type: "SET_LOGOUT" });
      navigate("/");
    }
  }, [localStorage.getItem("username"), localStorage.getItem("password")]);

  //Nuovo useEffect per far si che , se ci sono quei dati in localstorage, allora setta login in true
  // useEffect(() => {
  //   if (localStorage.getItem("username") && localStorage.getItem("password")) {
  //     dispatch({ type: "SET_LOGIN" });
  //   } else {
  //     dispatch({ type: "SET_LOGOUT" });
  //   }
  // }, [localStorage.getItem("username"), localStorage.getItem("password")]);

  useEffect(() => {
    if (navbarStatus.isActive && window.innerWidth <= 767) {
      window.document.body.style.overflowY = "hidden";
    }
    if (navbarStatus.isActive === false) {
      window.document.body.style.overflowY = "scroll";
    }
  }, [navbarStatus.isActive]);

  const handleOnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.menuIconDiv}>
        <button
          className={styles.menuIcon}
          onClick={handleHamOnClick}
          style={{
            width: "30px",
            height: "30px",
          }}
        >
          <BurgerSexy isClosed={navbarStatus.isActive} />
        </button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 onClick={handleOnClick} className={styles.siteTitle}>
            Beautify
          </h1>
        </Link>
        <Link to="cart" style={{ textDecoration: "none" }}>
          <BsCart4
            className={styles.icon}
            style={
              userData.isLogged === false && { visibility: "hidden" } // !localStorage.getItem("password") // !localStorage.getItem("username") &&
            }
          />
          <span
            className={styles.cartNum}
            style={
              userData.isLogged === false
                ? // !localStorage.getItem("username") &&
                  // !localStorage.getItem("password")
                  { visibility: "hidden" }
                : { visibility: "visible" }
            }
          >
            {cartData.cartList.length}
          </span>
        </Link>
      </div>
      <div
        className={`${styles.overlay} ${
          navbarStatus.isActive ? styles.active : ""
        }`}
        onClick={handleHamOnClick}
      ></div>
      <nav
        className={`${styles.slider} ${
          navbarStatus.isActive ? styles.active : ""
        }`}
      >
        <ul>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/"
            onClick={handleHamOnClick}
          >
            Home
          </NavLink>

          {userData.isLogged === false && (
            // !localStorage.getItem("username") &&
            //   !localStorage.getItem("email") &&
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to="login"
              onClick={handleHamOnClick}
            >
              Login
            </NavLink>
          )}
          {userData.isLogged === true &&
            localStorage.getItem("username") &&
            localStorage.getItem("email") && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  to="/dashboard"
                  onClick={handleHamOnClick}
                >
                  My beauty case
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                  to="/cart"
                  onClick={handleHamOnClick}
                >
                  My cart
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.link : styles.link
                  }
                  to="/"
                  onClick={handleLogoutOnClick}
                >
                  Logout
                </NavLink>
              </>
            )}
        </ul>
      </nav>
    </div>
  );
};

export default memo(Navbar);
