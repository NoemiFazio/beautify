import { useEffect } from "react";
import { GET } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import MakeupCard from "../MakeupCard/MakeupCard";
import styles from "./index.module.scss";

const MakeupList = () => {
  const dispatch = useDispatch();
  const { makeupData } = useSelector((state) => state);

  useEffect(() => {
    GET("", "lipstick").then((data) =>
      // "colourpop", "lipstick"
      dispatch({ type: "SET_MAKEUP_LIST", payload: data })
    );
  }, [dispatch]);

  return (
    <div className={styles.MakeupList}>
      {makeupData?.makeup?.map((product, index) => (
        <MakeupCard data={product} key={index} />
      ))}
    </div>
  );
};

export default MakeupList;
