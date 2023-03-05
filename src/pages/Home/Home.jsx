import styles from "../../../src/App.module.scss";
import MakeupList from "../../components/MakeupList";
import Slider from "../../components/Slider";
import FilterList from "../../components/FilterList";
import { memo } from "react";
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
  const { filterStatus, userData, cartData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClick = () => {
    dispatch({ type: "CLOSE_FILTER_MENU" });
    dispatch({ type: "CLOSE_CATEGORY_LIST" });
  };

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
      />
      {(filterStatus.isFilterActive || filterStatus.isCategoryClicked) && (
        <div className={styles.overlay} onClick={handleOverlayClick}></div>
      )}
      {<MakeupList brandKey={brandKey} typeKey={typeKey} />}
    </div>
  );
};

export default memo(Home);
