import styles from "./index.module.scss";
import MakeupCard from "../MakeupCard/MakeupCard";
import { useEffect, memo } from "react";
import { GET } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

const MakeupList = ({ brandKey, typeKey }) => {
  const dispatch = useDispatch();

  const { makeupData } = useSelector((state) => state);

  const itemsToRender = makeupData.makeup.slice(0, makeupData.index);

  useEffect(() => {
    dispatch({ type: "SET_LOADING_ON" });

    GET(brandKey, typeKey)
      .then((data) => dispatch({ type: "SET_MAKEUP_LIST", payload: data }))
      .then((data) => {
        dispatch({ type: "SET_LOADING_OFF" });
      })
      .catch(() => {
        dispatch({ type: "SET_LOADING_OFF" });
      });
  }, [dispatch, brandKey, typeKey]);

  return (
    <div id="makeupList" className={styles.MakeupList}>
      {makeupData.makeup.length ? (
        itemsToRender.map((product, index) => (
          <MakeupCard data={product} key={index} />
        ))
      ) : (
        <p>NO PRODUCTS AVAIABLE AT THE MOMENT </p>
      )}
    </div>
  );
};

export default memo(MakeupList);
