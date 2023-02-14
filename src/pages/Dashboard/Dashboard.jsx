// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const Dashboard = ({ user }) => {
  return (
    <div className={styles.Dashboard}>
      <h1>Buonsalve {user?.name}</h1>
    </div>
  );
};

export default memo(Dashboard);
