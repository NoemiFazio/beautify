// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const ProductPage = () => {
  return (
    <div className={styles.ProductPage}>
      <div>Product</div>
    </div>
  );
};

export default memo(ProductPage);
