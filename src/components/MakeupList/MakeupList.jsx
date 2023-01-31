import { useEffect, memo } from "react";
import { GET } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import MakeupCard from "../MakeupCard/MakeupCard";
import styles from "./index.module.scss";

const MakeupList = ({ brandKey, typeKey }) => {
  const dispatch = useDispatch();
  const { makeupData, filterStatus } = useSelector((state) => state);

  useEffect(() => {
    GET(
      brandKey,
      typeKey
      // "",
      // "lipstick"
      // "colourpop", "lipstick"
    ).then((data) => dispatch({ type: "SET_MAKEUP_LIST", payload: data }));
  }, [dispatch, brandKey, typeKey]);

  return (
    <div className={styles.MakeupList}>
      {makeupData.makeup.length ? (
        makeupData?.makeup?.map((product, index) => (
          <MakeupCard data={product} key={index} />
        ))
      ) : (
        <p>NO PRODUCTS AVAIABLE AT THE MOMENT </p>
      )}
      {/* {console.log("MAKEUPLIST")} */}
    </div>
  );
};

export default memo(MakeupList);
