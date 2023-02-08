// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, memo } from "react";
import { BsCart4 } from "react-icons/bs";
import { BurgerSexy } from "react-burger-icons";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

const Navbar = () => {
  const { navbarStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

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

        <h1 className={styles.siteTitle}>Beautify</h1>
        <BsCart4 className={styles.icon} />
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
          <NavLink className={styles.link} to="/" onClick={handleHamOnClick}>
            Home
          </NavLink>

          <NavLink
            className={styles.link}
            to="/cart"
            onClick={handleHamOnClick}
          >
            Cart
          </NavLink>

          <NavLink className={styles.link} to="/" onClick={handleHamOnClick}>
            Sales
          </NavLink>
          <NavLink className={styles.link} to="/" onClick={handleHamOnClick}>
            Login
          </NavLink>
        </ul>
      </nav>
      {/* {console.log("NAVBAR")} */}
    </div>
  );
};

export default memo(Navbar);
