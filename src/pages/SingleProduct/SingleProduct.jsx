// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.scss";

const SingleProduct = () => {
  const { productId } = useParams();

  const { makeupData } = useSelector((state) => state);
  const product = makeupData.makeup.find(
    (product) => product.id === +productId
  );
  const {
    name,
    id,
    product_type,
    price,
    price_sign,
    api_featured_image,
    brand,
  } = product;

  return (
    <div className={styles.SingleProduct}>
      <h1>{productId}</h1>

      <Link to="/">Torna alla home</Link>
    </div>
  );
};

export default memo(SingleProduct);
