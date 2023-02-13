// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const Products = () => {
  return (
    <div className={styles.Products}>
      <div>Product</div>
    </div>
  );
};

export default memo(Products);
