import styles from "./index.module.scss";
import { GET } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, memo } from "react";

const FilterList = ({
  setBrandKey,
  setTypeKey,
  setLabelBrandValue,
  setLabelCategoryValue,
  labelCategoryValue,

  labelBrandValue,
}) => {
  const dispatch = useDispatch();
  const { filterStatus } = useSelector((state) => state);
  const [filterCategory, setFilterCategory] = useState("");
  // const [labelCategoryValue, setLabelCategoryValue] = useState("");
  // const [labelBrandValue, setLabelBrandValue] = useState("");

  // const Category = [
  //   { phrase: "5 Stars" },
  //   { phrase: "4 Stars" },
  //   { phrase: "3 Stars" },
  //   { phrase: "2 Stars" },
  //   { phrase: "1 Stars" },
  // ];
  // const Brand = [
  //   { phrase: "Boosh" },
  //   { phrase: "Coastal classic creation" },
  //   { phrase: "C'est moi" },
  //   { phrase: "Colourpop" },
  //   { phrase: "Glossier" },
  //   { phrase: "Marienatie" },
  //   { phrase: "Nudus" },
  //   { phrase: "Nyx" },
  //   { phrase: "Penny lane organics" },
  //   { phrase: "Sally b's skin yummies" },
  // ];
  const filtersCategory = [
    // { name: "Rating" },
    { name: "Brand" },
    { name: "Category" },
    { name: "Clear" },
  ];

  useEffect(() => {
    GET("", "").then((data) =>
      // "colourpop", "lipstick"

      dispatch({ type: "SET_LABELS_LIST", payload: data })
    );
  }, [dispatch]);

  const handleFilterClick = () => {
    dispatch({ type: "OPEN_FILTER_MENU" });
    if (filterStatus.isFilterActive === true) {
      dispatch({ type: "CLOSE_FILTER_MENU" });
      dispatch({ type: "CLOSE_CATEGORY_LIST" });
    }
  };

  const handleCategoryClick = (value) => {
    if (value === "Clear") {
      setTypeKey("");
      setBrandKey("");
      setLabelCategoryValue("");
      setLabelBrandValue("");
      localStorage.clear();
      dispatch({ type: "CLOSE_FILTER_MENU" });
    } else {
      dispatch({ type: "OPEN_CATEGORY_LIST" });

      if (filterStatus.isCategoryClicked === true && filterCategory === value) {
        dispatch({ type: "CLOSE_CATEGORY_LIST" });
      }
      setFilterCategory(value);
    }
  };

  // useEffect(() => {
  //   if (clickedValue === index) {
  //     const elem = document.getElementById(`'label${index}'`);
  //     elem.style.color = "pink";
  //   }
  // }, [clickedValue]);

  const handleSingleLabel = (item, index) => {
    const key = item.split("_").join("%20");
    if (filterCategory === "Category") {
      setTypeKey(key);
      setLabelCategoryValue(item);

      if (labelCategoryValue === item) {
        setLabelCategoryValue("");
        setTypeKey("");
      }
      // localStorage.setItem(`categoryValue${item}`, JSON.stringify(item));
    } else {
      setBrandKey(key);
      setLabelBrandValue(item);

      if (labelBrandValue === item) {
        setLabelBrandValue("");
        setBrandKey("");
      }
      // localStorage.setItem(`brandValue${item}`, JSON.stringify(item));
    }
    // filterCategory === "Category" ? setTypeKey(key) : setBrandKey(key);
    dispatch({ type: "CLOSE_CATEGORY_LIST" });
    dispatch({ type: "CLOSE_FILTER_MENU" });

    // setIndexValue(index);
    // setLabelValue(item);
    // filterCategory === "Category"
    //   ? localStorage.setItem("categoryValue", JSON.stringify(`${item}${index}`))
    //   : localStorage.setItem("brandValue", JSON.stringify(`${item}${index}`));
    // filterCategory === "Category"
    //   ? dispatch({ type: "SET_CATEGORY_VALUE", payload: `${item}${index}` })
    //   : dispatch({ type: "SET_BRAND_VALUE", payload: `${item}${index}` });
    // setIsClicked(!clicked);
  };

  return (
    <div className={styles.FilterList}>
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
          {/* {(filterCategory === "Category" ? Category : Brand).map(
            (item, index) => (
              <label
                className={styles.filter}
                key={index}
                onClick={handleSingleLabel}
              >
                {item.phrase}
              </label>
            )
          )}
        </div>
      ) : (
        <></>  )}
    </div> */}
          {filterStatus?.labels
            .map((item) =>
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
                {labelCategoryValue === item ? <span>💋</span> : ""}
                {labelBrandValue === item ? <span>💋</span> : ""}
              </label>
            ))}
        </div>
      ) : (
        <></>
      )}
      {/* {console.log("FILTERLIST")} */}
    </div>
  );
};

export default memo(FilterList);
