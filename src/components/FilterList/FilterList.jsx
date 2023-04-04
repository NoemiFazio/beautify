import styles from "./index.module.scss";
import { GET } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, memo, useCallback } from "react";

const FilterList = ({
  setBrandKey,
  setTypeKey,
  setLabelBrandValue,
  setLabelCategoryValue,
  labelCategoryValue,
  labelBrandValue,
  typeKey,
}) => {
  const dispatch = useDispatch();

  const { filterStatus, makeupData } = useSelector((state) => state);

  const [filterCategory, setFilterCategory] = useState("");

  const filtersCategory = [
    // { name: "Rating" },
    { name: "Brand" },
    { name: "Category" },
    { name: "Clear" },
  ];

  useEffect(() => {
    GET("", "").then((data) =>
      dispatch({ type: "SET_LABELS_LIST", payload: data })
    );
  }, [dispatch]);

  const handleFilterClick = () => {
    if (filterStatus.isFilterActive === true) {
      dispatch({ type: "CLOSE_FILTER_MENU" });
      dispatch({ type: "CLOSE_CATEGORY_LIST" });
    } else dispatch({ type: "OPEN_FILTER_MENU" });
  };

  const handleCategoryClick = useCallback((value) => {
    if (value === "Clear") {
      // dispatch({ type: "SET_LOADING_ON" });
      setTypeKey("");
      setBrandKey("");
      setLabelCategoryValue("");
      setLabelBrandValue("");
      localStorage.clear();
      dispatch({ type: "CLOSE_FILTER_MENU" });
      dispatch({ type: "RESET_INDEX" });
    } else {
      setFilterCategory(value);
      if (filterStatus.isCategoryClicked === true && filterCategory === value) {
        dispatch({ type: "CLOSE_FILTER_MENU" });
      }

      dispatch({ type: "OPEN_CATEGORY_LIST" });
    }
  }, []);

  const handleSingleLabel = (item) => {
    const key = item.split("_").join("%20");
    // dispatch({ type: "SET_LOADING_ON" });
    if (filterCategory === "Category") {
      setTypeKey(key);
      setLabelCategoryValue(item);
      dispatch({ type: "RESET_INDEX" });

      if (labelCategoryValue === item) {
        setLabelCategoryValue("");
        setTypeKey("");
        dispatch({ type: "RESET_INDEX" });
      }
    } else {
      setBrandKey(key);
      setLabelBrandValue(item);
      dispatch({ type: "RESET_INDEX" });

      if (labelBrandValue === item) {
        setLabelBrandValue("");
        setBrandKey("");
        dispatch({ type: "RESET_INDEX" });
      }
    }

    dispatch({ type: "CLOSE_CATEGORY_LIST" });
    dispatch({ type: "CLOSE_FILTER_MENU" });
  };

  return (
    <div
      className={styles.FilterList}
      style={
        filterStatus.labels.length >= 1
          ? { visibility: "visible" }
          : { visibility: "hidden" }
      }
    >
      <div className={styles.mainDiv}>
        <button className={styles.filterBtn} onClick={handleFilterClick}>
          <p>Filters</p>
          <p>{filterStatus?.isFilterActive ? "-" : "+"}</p>
        </button>
        {filterStatus?.isFilterActive && (
          <div className={styles.categories}>
            {filtersCategory?.map((item, index) => (
              <label
                className={styles.category}
                onClick={() => handleCategoryClick(item.name)}
                key={index}
              >
                {item.name}
              </label>
            ))}
          </div>
        )}
      </div>
      {filterStatus?.isFilterActive === true &&
      filterStatus?.isCategoryClicked === true ? (
        <div className={styles.filtersDiv}>
          {filterStatus?.labels
            ?.map((item) =>
              filterCategory === "Category" ? item.product_type : item.brand
            )
            .filter(
              (value, index, self) =>
                self.indexOf(value) === index && value !== null && value !== ""
            )
            .map((item, index) => (
              <label
                className={styles.filter}
                id={item?.split("_")?.join(" ")}
                key={index}
                onClick={() => handleSingleLabel(item, index)}
              >
                {item?.split("_")?.join(" ")}
                {item?.split("_")?.join(" ") === typeKey ||
                labelCategoryValue === item ? (
                  <span>💋</span>
                ) : (
                  ""
                )}

                {labelBrandValue === item ? <span>💋</span> : ""}
              </label>
            ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(FilterList);
