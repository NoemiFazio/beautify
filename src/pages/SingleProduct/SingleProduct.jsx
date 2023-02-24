// import styles from "./index.module.scss";
import { memo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ImEnlarge } from "react-icons/im";
import styles from "./index.module.scss";

const SingleProduct = () => {
  const { productId } = useParams();
  const { makeupData, userData } = useSelector((state) => state);
  const product = makeupData.makeup.find(
    (product) => product.id === +productId
  );
  const {
    name,
    product_type,
    price,
    price_sign,
    api_featured_image,
    brand,
    description,
    tag_list,
    product_colors,
  } = product;
  const dispatch = useDispatch();

  const handleOnCartClick = () => {
    // dispatch({ type: "SET_TRUE" });
    if (userData.isLogged === false) {
      dispatch({ type: "SET_LOGIN_MODAL_ON" });
    } else if (userData.isLogged === true) {
      // dispatch({ type: "SET_LOGIN_MODAL_OFF" });
      dispatch({ type: "ADD_PRODUCT", payload: product });
    }
  };

  return (
    <div className={styles.SingleProduct}>
      <div className={styles.specsDiv}>
        <span className={styles.specsSpan}>{brand}</span>
        <span className={styles.specsSpan}>
          <h4 className={styles.specsH4}>/</h4>
        </span>

        <span className={styles.specsSpan}>
          {product_type?.split("_")?.join(" ")}
        </span>
      </div>
      <h2 className={styles.name}>{name}</h2>
      <h4 className={styles.price}>{`${price}0 ${price_sign
        ?.split("£")
        ?.join("€")}`}</h4>
      <div className={styles.imgDiv}>
        <img src={api_featured_image} className={styles.img} alt="" />

        <ImEnlarge className={styles.enlargeIcon} />
      </div>
      <div className={styles.btnDiv}>
        <button className={styles.addToBagBtn} onClick={handleOnCartClick}>
          Add to bag
        </button>
      </div>
      <Link to="/">Torna alla home</Link>
    </div>
  );
};

export default memo(SingleProduct);
