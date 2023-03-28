import { memo } from "react";
import styles from "./index.module.scss";

const Products = () => {
  return (
    <div className={styles.Products}>
      <div>Product</div>
    </div>
  );
};

export default memo(Products);
