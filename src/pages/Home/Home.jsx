import styles from "../../../src/App.module.scss";
import MakeupList from "../../components/MakeupList";
import Slider from "../../components/Slider";
import FilterList from "../../components/FilterList";
import Button from "../../components/Button/Button";
import { memo, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Home = ({
  typeKey,
  setTypeKey,
  brandKey,
  setBrandKey,
  labelCategoryValue,
  setLabelCategoryValue,
  labelBrandValue,
  setLabelBrandValue,
}) => {
  const { filterStatus, userData, cartData, makeupData } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const [isActive, setIsActive] = useState(false);

  const element = ref.current;

  function isDisabled() {
    return makeupData.index >= makeupData.makeup.length;
  }
  const onHandleBtn = () => {
    dispatch({ type: "INCREMENT_INDEX" });
  };

  const handleOverlayClick = () => {
    dispatch({ type: "CLOSE_FILTER_MENU" });
    dispatch({ type: "CLOSE_CATEGORY_LIST" });
  };

  function isInViewport(element) {
    // const bounding = ref.current.getBoundingClientRect();
    if (!ref.current) return;

    if (
      // bounding.top >= 0 &&
      // bounding.left >= 0 &&
      // bounding.right <=
      //   (window.innerWidth || document.documentElement.clientWidth) &&
      ref.current.getBoundingClientRect().bottom <= 396.8000068664551
    ) {
      // console.log("In the viewport! :)");
      // console.log(bounding.bottom);
      setIsActive(true);
      setTimeout(() => {
        dispatch({ type: "INCREMENT_INDEX" });
        setIsActive(false);
        console.log(makeupData.index);
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
        () => isInViewport(element)
        // function (event) {
        //   if (isInViewport(element)) {
        //     // console.log(window.location.href);
        //     // update the element display
        //   }
        // },
        // false
      );
    }
    return window.removeEventListener("scroll", () => isInViewport());
  }, []);

  return (
    <div className={styles.App}>
      <Slider />

      <FilterList
        setBrandKey={setBrandKey}
        setTypeKey={setTypeKey}
        setLabelCategoryValue={setLabelCategoryValue}
        setLabelBrandValue={setLabelBrandValue}
        labelCategoryValue={labelCategoryValue}
        labelBrandValue={labelBrandValue}
        typeKey={typeKey}
      />

      {(filterStatus.isFilterActive || filterStatus.isCategoryClicked) && (
        <div className={styles.overlay} onClick={handleOverlayClick}></div>
      )}
      {<MakeupList brandKey={brandKey} typeKey={typeKey} />}
      <div className={styles.btnDiv}>
        {makeupData.makeup.length ? (
          <Button
            handleOnClick={onHandleBtn}
            disabled={isDisabled()}
            type="loadBtn"
            ref={ref}
            isActive={isActive}
            style={
              makeupData.index >= makeupData.makeup.length
                ? { display: "none" }
                : { display: "block" }
            }
          >
            Load more
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default memo(Home);
