// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, memo } from "react";
import { Navigate, useNavigate } from "react-router";

import { BsCart4 } from "react-icons/bs";
import { BurgerSexy } from "react-burger-icons";
import { NavLink, Link } from "react-router-dom";

import styles from "./index.module.scss";

const Navbar = () => {
  const { navbarStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isScrollDown, setIsScrollDown] = useState(false);

  // const eventScrollDown = () => {
  //   if (window.scrollY > 400) {
  //     setIsScrollDown(true);
  //   } else if (window.scrollY < 400) {
  //     setIsScrollDown(false);
  //   }
  // };

  const handleHamOnClick = () => {
    dispatch({ type: "OPEN_MENU" });
    if (navbarStatus.isActive === true) {
      dispatch({ type: "CLOSE_MENU" });
    }
  };
  const handleLogoutOnClick = () => {
    dispatch({ type: "OPEN_MENU" });
    if (navbarStatus.isActive === true) {
      dispatch({ type: "CLOSE_MENU" });
      localStorage.clear();
      navigate("/");
    }
  };

  // Questo useEffect fa si che, quando il menù a tendina si apre, non possa avvenire lo scroll in basso <3
  useEffect(() => {
    if (navbarStatus.isActive && window.innerWidth <= 767) {
      window.document.body.style.overflowY = "hidden";
    }
    if (navbarStatus.isActive === false) {
      window.document.body.style.overflowY = "scroll";
    }
  }, [navbarStatus.isActive]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", () => eventScrollDown());
  //   }
  //   return window.removeEventListener("scroll", () => eventScrollDown());
  // }, []);

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
          <h1 className={styles.siteTitle}>Beautify</h1>
        </Link>
        <Link to="cart">
          <BsCart4
            className={styles.icon}
            style={
              !localStorage.getItem("username") &&
              !localStorage.getItem("password") && { visibility: "hidden" }
            }
          />
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

          {!localStorage.getItem("username") &&
            !localStorage.getItem("email") && (
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
          {localStorage.getItem("username") &&
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
                    isActive ? `${styles.link} ${styles.active}` : styles.link
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
      {/* {console.log("NAVBAR")} */}
    </div>
  );
};

export default memo(Navbar);
