import { useEffect, memo, useState } from "react";
import { GET } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import MakeupCard from "../MakeupCard/MakeupCard";
import styles from "./index.module.scss";

const MakeupList = ({ brandKey, typeKey }) => {
  const dispatch = useDispatch();
  const { makeupData, filterStatus } = useSelector((state) => state);
  const itemsToRender = makeupData.makeup.slice(0, makeupData.index);

  function isDisabled() {
    return makeupData.index >= makeupData.makeup.length;
  }
  const onHandleBtn = () => {
    dispatch({ type: "INCREMENT_INDEX" });
  };

  useEffect(() => {
    GET(brandKey, typeKey).then((data) =>
      dispatch({ type: "SET_MAKEUP_LIST", payload: data })
    );
  }, [dispatch, brandKey, typeKey]);

  // const element = window.document.getElementById("loadBtn");
  // // const bounding = element.getBoundingClientRect();

  // function isInViewport(element) {
  //   // Get the bounding client rectangle position in the viewport
  //   const bounding = element.getBoundingClientRect();

  //   // Checking part. Here the code checks if it's *fully* visible
  //   // Edit this part if you just want a partial visibility
  //   if (
  //     bounding.top >= 0 &&
  //     bounding.left >= 0 &&
  //     bounding.right <=
  //       (window.innerWidth || document.documentElement.clientWidth) &&
  //     bounding.bottom <=
  //       (window.innerHeight || document.documentElement.clientHeight)
  //   ) {
  //     console.log("In the viewport! :)");
  //     // dispatch({ type: "INCREMENT_INDEX" });
  //     return true;
  //   } else {
  //     console.log("Not in the viewport. :(");
  //     return false;
  //   }
  // }

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener(
  //       "scroll",
  //       function (event) {
  //         if (isInViewport(element)) {
  //           // update the element display
  //         }
  //       },
  //       false
  //     );
  //   }
  // }, []);

  return (
    <div id="makeupList" className={styles.MakeupList}>
      {makeupData.makeup.length ? (
        itemsToRender.map((product, index) => (
          <MakeupCard data={product} key={index} />
        ))
      ) : (
        <p>NO PRODUCTS AVAIABLE AT THE MOMENT </p>
      )}

      {/* {console.log(makeupData.makeup)} */}
      <button id="loadBtn" onClick={onHandleBtn} disabled={isDisabled()}>
        Load more
      </button>
    </div>
  );
};

export default memo(MakeupList);
