// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./index.module.scss";

const Navbar = () => {
  //   const [menuActive, setMenuActive] = useState(false);
  const handleHamOnClick = () => {
    // setMenuActive(!menuActive);
    dispatch({ type: "OPEN_MENU" });
    if (navbarStatus.isActive === true) {
      dispatch({ type: "CLOSE_MENU" });
    }
  };

  const { navbarStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <div className={styles.menuIcon}>
        <CgMenuRight
          className={styles.menuIconOpen}
          onClick={handleHamOnClick}
        />
      </div>
      <nav
        className={`${styles.slider} ${
          navbarStatus.isActive ? styles.active : ""
        }`}
      >
        <ul>
          <div className={styles.menuIconClosed}>
            <AiOutlineClose
              onClick={handleHamOnClick}
              className={styles.iconClosed}
            />
          </div>
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
