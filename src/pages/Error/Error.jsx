// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const Error = () => {
  return (
    <div className={styles.Error}>
      <div>Error</div>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default memo(Error);
