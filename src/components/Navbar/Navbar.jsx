// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { BurgerSexy } from "react-burger-icons";
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
    if (navbarStatus.isActive === true) {
      window.document.body.style.overflowY = "hidden";
    } else {
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
      <nav
        className={`${styles.slider} ${
          navbarStatus.isActive ? styles.active : ""
        }`}
      >
        <ul>
          <li>
            {/* <Link to="/"> */}
            Home
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to="/"> */}
            Categories
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to="/"> */}
            Sales
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to="/"> */}
            Login
            {/* </Link> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
