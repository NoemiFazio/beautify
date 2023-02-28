// import Image from "next/image";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";

// import { useRouter } from "next/router";
import styles from "./index.module.scss";
// import { toBase64, shimmer } from "../../utils/shimmer";

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

  function getOccurrence(array, value) {
    return array.filter((v) => v === value).length;
  }
  // const router = useRouter();

  // const handleOnDiscountClick = () => {
  //   router.push("/activity/" + uuid);
  // };

  return (
    <div className={styles.miniCard}>
      <Link to={`/products/${id}`}>
        <img src={api_featured_image} key={id} id={id} alt={name} />
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

      {/* <p>{discount}</p>
      <span>{city.name}</span> */}
    </div>
  );
};

export default memo(CarouselCard);
