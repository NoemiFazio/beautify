import styles from "./index.module.scss";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";

const CarouselCard = ({ cardData, type }) => {
  const {
    name,
    id,
    product_type,
    price,
    price_sign,
    api_featured_image,
    brand,
  } = cardData;

  const dispatch = useDispatch();

  const { cartData, makeupData, userData } = useSelector((state) => state);

  const handleWishListBtn = () => {
    if (userData.isLogged === false) {
      dispatch({ type: "SET_LOGIN_MODAL_ON" });
    } else {
      dispatch({ type: "SET_FAVORITE_MAKEUP", payload: cardData });
      localStorage.setItem("favourites", JSON.stringify(makeupData.favourites));

      if (makeupData.favourites.find((item) => item.id === id)) {
        dispatch({ type: "REMOVE_FAVORITE_MAKEUP", payload: id });
      }
    }
  };

  const handleOnImageClick = () => {
    if (makeupData.viewed.find((item) => item.id === id)) {
      return;
    } else {
      dispatch({ type: "SET_VIEWED_PRODUCT", payload: cardData });
      localStorage.setItem("viewed", JSON.stringify(makeupData.viewed));
    }
  };

  const getOccurrence = (array, value) => {
    return array.filter((v) => v === value).length;
  };

  return (
    <div className={styles.miniCard}>
      <Link to={`/products/${id}`}>
        <img
          src={api_featured_image}
          key={id}
          id={id}
          alt={name}
          onClick={handleOnImageClick}
        />
      </Link>
      {type === "beautycase" && (
        <span className={styles.occurrenceSpan}>
          x{getOccurrence(cartData.purchasedList, cardData)}
        </span>
      )}
      {type === "favourites" &&
        (!makeupData.favourites.find((item) => item.id === id) ? (
          <RiHeart3Line
            onClick={handleWishListBtn}
            className={styles.wishListBtn}
          />
        ) : (
          <RiHeart3Fill
            onClick={handleWishListBtn}
            className={`${styles.wishListBtn} ${styles.active}`}
          />
        ))}
    </div>
  );
};

export default memo(CarouselCard);
