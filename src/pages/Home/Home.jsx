import styles from "../../../src/App.module.scss";
import { memo, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import MakeupList from "../../components/MakeupList";
import Slider from "../../components/Slider";
import FilterList from "../../components/FilterList";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

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
  const { filterStatus, makeupData } = useSelector((state) => state);

  const dispatch = useDispatch();

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
    if (!ref.current) return;

    if (ref.current.getBoundingClientRect().bottom <= 466) {
      // console.log("In the viewport! :)");

      setIsActive(true);
      setTimeout(() => {
        dispatch({ type: "INCREMENT_INDEX" });
        setIsActive(false);
      }, 2000);

      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => isInViewport(element));
    }
    return window.removeEventListener("scroll", () => isInViewport());
  }, []);

  return (
    <div className={styles.App}>
      <Slider />
      {/* {makeupData.isLoading === true && <Loader />} */}
      {makeupData.isLoading && <Loader />}
      <FilterList
        setBrandKey={setBrandKey}
        setTypeKey={setTypeKey}
        setLabelCategoryValue={setLabelCategoryValue}
        setLabelBrandValue={setLabelBrandValue}
        labelCategoryValue={labelCategoryValue}
        labelBrandValue={labelBrandValue}
        typeKey={typeKey}
      />

      {/* <FilterList
        setBrandKey={setBrandKey}
        setTypeKey={setTypeKey}
        setLabelCategoryValue={setLabelCategoryValue}
        setLabelBrandValue={setLabelBrandValue}
        labelCategoryValue={labelCategoryValue}
        labelBrandValue={labelBrandValue}
        typeKey={typeKey}
      /> */}

      {(filterStatus.isFilterActive || filterStatus.isCategoryClicked) && (
        <div className={styles.overlay} onClick={handleOverlayClick}></div>
      )}
      {<MakeupList brandKey={brandKey} typeKey={typeKey} />}
      <div className={styles.btnDiv}>
        {makeupData.makeup.length ? (
          <Button
            name="Load next products button"
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
