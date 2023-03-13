import { useEffect, memo, useState, useRef } from "react";
import { GET } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import MakeupCard from "../MakeupCard/MakeupCard";
import Button from "../Button/Button";
import styles from "./index.module.scss";

const MakeupList = ({ brandKey, typeKey }) => {
  const dispatch = useDispatch();
  const { makeupData, filterStatus } = useSelector((state) => state);
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const itemsToRender = makeupData.makeup.slice(0, makeupData.index);

  const element = window.document.getElementById("loadBtn");

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

  function isInViewport(element) {
    const bounding = ref.current.getBoundingClientRect();
    if (!ref.current) return;

    if (
      // bounding.top >= 0 &&
      // bounding.left >= 0 &&
      // bounding.right <=
      //   (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= 396.8000068664551
    ) {
      // console.log("In the viewport! :)");
      // console.log(bounding.bottom);
      setIsActive(true);
      setTimeout(() => {
        dispatch({ type: "INCREMENT_INDEX" });
        setIsActive(false);
      }, 2000);

      return true;
    } else {
      // console.log("Not in the viewport. :(");
      return false;
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "scroll",
        function (event) {
          if (isInViewport(element)) {
            // update the element display
          }
        },
        false
      );
    }
  }, []);

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

      {/* <button onClick={onHandleBtn} disabled={isDisabled()} ref={ref}>
        Load more
      </button> */}
      {makeupData.makeup.length ? (
        <Button
          handleOnClick={onHandleBtn}
          disabled={isDisabled()}
          type="loadBtn"
          ref={ref}
          isActive={isActive}
          style={
            makeupData.index >= makeupData.makeup.length
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        >
          Load more
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(MakeupList);
