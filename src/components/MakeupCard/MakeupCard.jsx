import { useDispatch, useSelector } from "react-redux";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { memo } from "react";
import styles from "./index.module.scss";
import Button from "../Button/Button";

const MakeupCard = ({ data }) => {
  const {
    name,
    id,
    product_type,
    price,
    price_sign,
    api_featured_image,
    brand,
  } = data;
  const dispatch = useDispatch();
  const { makeupData, userData } = useSelector((state) => state);

  const handleWishListBtn = () => {
    if (userData.isLogged === false) {
      dispatch({ type: "SET_LOGIN_MODAL_ON" });
    } else {
      dispatch({ type: "SET_FAVORITE_MAKEUP", payload: data });
      localStorage.setItem("favourites", JSON.stringify(makeupData.favourites));

      if (makeupData.favourites.find((item) => item.id === id)) {
        dispatch({ type: "REMOVE_FAVORITE_MAKEUP", payload: id });
      }
    }
  };

  const handleOnCartClick = () => {
    // dispatch({ type: "SET_TRUE" });
    if (userData.isLogged === false) {
      dispatch({ type: "SET_LOGIN_MODAL_ON" });
    } else if (userData.isLogged === true) {
      // dispatch({ type: "SET_LOGIN_MODAL_OFF" });
      dispatch({ type: "ADD_PRODUCT", payload: data });
    }
  };

  const handleOnImageClick = () => {
    if (makeupData.viewed.find((item) => item.id === id)) {
      return;
    } else {
      dispatch({ type: "SET_VIEWED_PRODUCT", payload: data });
      localStorage.setItem("viewed", JSON.stringify(makeupData.viewed));
    }
  };

  return (
    <div className={styles.MakeupCard}>
      <div className={styles.imageDiv}>
        <Link to={`/products/${id}`}>
          <img
            className={styles.makeupImage}
            src={api_featured_image}
            alt={name}
            onClick={handleOnImageClick}
          />
        </Link>
      </div>

      <div className={styles.detailsDiv}>
        <label id={name} className={styles.title}>
          {name}
        </label>{" "}
        <div className={styles.specsAndBtnDiv}>
          <div className={styles.specifics}>
            <label id={brand} className={styles.brand}>
              {brand}
            </label>
            {/* <label id={name} className={styles.category}>
            {product_type?.split("_")?.join(" ")}
          </label> */}

            <span className={styles.price}>
              {price_sign === null
                ? `${price} €
          `
                : `${price}0 ${price_sign?.split(`${price_sign}`)?.join("€")}`}
            </span>
          </div>
          <Button handleOnClick={handleOnCartClick} type="cardBtn">
            Add to bag
          </Button>
        </div>
        {!makeupData.favourites.find((item) => item.id === id) ? (
          <RiHeart3Line
            onClick={handleWishListBtn}
            className={styles.wishListBtn}
          />
        ) : (
          <RiHeart3Fill
            onClick={handleWishListBtn}
            className={`${styles.wishListBtn} ${styles.active}`}
          />
        )}
      </div>
      {/* {console.log("MAKEUPCARD")} */}
    </div>
  );
};

export default memo(MakeupCard);
