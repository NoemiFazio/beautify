import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const MakeupCard = ({ data }) => {
  const { name, category, price, price_sign, api_featured_image, brand } = data;
  const dispatch = useDispatch();
  const { makeupData } = useSelector((state) => state);

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
        <label id={name} className={styles.category}>
          {category}
        </label>
        <label id={brand} className={styles.brand}>
          {brand}
        </label>
        <span className={styles.price}>{`${price} ${price_sign}`}</span>

        <button className={styles.addToBagBtn}>Add to bag</button>
        <button className={styles.wishListBtn}>❤️</button>
      </div>
    </div>
  );
};

export default MakeupCard;
