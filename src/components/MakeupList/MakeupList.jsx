import { useEffect } from "react";
import { GET } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const MakeupList = () => {
  const dispatch = useDispatch();
  const { makeupData } = useSelector((state) => state);

  useEffect(() => {
    GET("colourpop", "lipstick").then((data) =>
      dispatch({ type: "SET_MAKEUP_LIST", payload: data })
    );
  }, [dispatch]);

  return (
    <div className={styles.MakeupList}>{/* {console.log(makeupData)} */}</div>
  );
};

export default MakeupList;
