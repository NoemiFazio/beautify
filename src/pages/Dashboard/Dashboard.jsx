// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  const { makeupData } = useSelector((state) => state);

  return (
    <div className={styles.Dashboard}>
      <h1>Buonsalve {localStorage.getItem("username")}</h1>
      <h3>La tua lista dei preferiti:</h3>
      <div>
        {makeupData.favourites.length ? (
          makeupData?.favourites?.map((favourite, index) => (
            <p key={index}>{favourite.name}</p>
          ))
        ) : (
          <p>Lista vuota</p>
        )}
      </div>
    </div>
  );
};

export default memo(Dashboard);
