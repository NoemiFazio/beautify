import { useDispatch, useSelector } from "react-redux";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import styles from "./index.module.scss";

const MakeupCard = ({ data }) => {
  const { name, id, category, price, price_sign, api_featured_image, brand } =
    data;
  const dispatch = useDispatch();
  const { makeupData } = useSelector((state) => state);

  const handleWishListBtn = () => {
    dispatch({ type: "SET_FAVORITE_MAKEUP", payload: data });
    localStorage.setItem("favourites", JSON.stringify(makeupData.favourites));

    if (makeupData.favourites.find((item) => item.id === id)) {
      dispatch({ type: "REMOVE_FAVORITE_MAKEUP", payload: id });
    }
  };

  return (
    <div className={styles.MakeupCard}>
      <div className={styles.imageDiv}>
        <img
          className={styles.makeupImage}
          src={api_featured_image}
          alt={name}
        />
      </div>

      <div className={styles.detailsDiv}>
        <label id={name} className={styles.title}>
          {name}
        </label>

        <div className={styles.specifics}>
          <label id={brand} className={styles.brand}>
            {brand}
          </label>
          <label id={name} className={styles.category}>
            {category?.split("_")?.join(" ")}
          </label>

          <span className={styles.price}>{`${price} ${price_sign}`}</span>
        </div>

        <button className={styles.addToBagBtn}>Add to bag</button>
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
    </div>
  );
};

export default MakeupCard;
