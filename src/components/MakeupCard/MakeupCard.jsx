import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const MakeupCard = ({ data }) => {
  const { name, category, price, price_sign, api_featured_image, brand } = data;
  const dispatch = useDispatch();
  const { makeupData } = useSelector((state) => state);

  return (
    <div className={styles.MakeupCard}>
      <img className={styles.makeupImage} src={api_featured_image} alt={name} />
      <div className={styles.detailsDiv}>
        <label id={name} className={styles.title}>
          {name}
        </label>
        <label id={name} className={styles.category}>
          {category}
        </label>
      </div>
      <button></button>
    </div>
  );
};

export default MakeupCard;
