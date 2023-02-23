// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const Error = () => {
  return (
    <div className={styles.Error}>
      <img
        className={styles.errorImg}
        src="https://freesvg.org/img/1538504528.png"
        alt="PageNotFound"
      />
      <span>
        <h1 className={styles.questionMark}>?</h1>
      </span>
      <span>
        <h2 className={styles.questionMark2}>?</h2>
      </span>
      <div className={styles.messageContainer}>
        <h4>Where...exactly am I...?</h4>
        <Link className={styles.link} to="/">
          <button>Let's return back home.</button>
        </Link>
      </div>
    </div>
  );
};

export default memo(Error);
