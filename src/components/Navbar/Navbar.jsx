// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import { BurgerSexy } from "react-burger-icons";
import styles from "./index.module.scss";

const Navbar = () => {
  const handleHamOnClick = () => {
    dispatch({ type: "OPEN_MENU" });
    if (navbarStatus.isActive === true) {
      dispatch({ type: "CLOSE_MENU" });
    }
  };

  const { navbarStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

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
