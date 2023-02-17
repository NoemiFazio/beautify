// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  const { makeupData, cartData, userData } = useSelector((state) => state);

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
      <h3>Nel tuo beauty case:</h3>
      <div>
        {cartData.purchasedList.length ? (
          cartData?.purchasedList?.map((purchase, index) => (
            <p key={index}>{purchase.name}</p>
          ))
        ) : (
          <p>Lista vuota</p>
        )}
      </div>
      <h3>Cos'hai visto:</h3>
      <div>
        {makeupData.viewed.length ? (
          makeupData?.viewed?.map((obj, index) => <p key={index}>{obj.name}</p>)
        ) : (
          <p>Lista vuota</p>
        )}
      </div>
    </div>
  );
};

export default memo(Dashboard);
