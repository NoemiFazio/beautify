import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const FilterList = () => {
  const { filterStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  const starFilters = [
    { phrase: "5 Stars" },
    { phrase: "4 Stars" },
    { phrase: "3 Stars" },
    { phrase: "2 Stars" },
    { phrase: "1 Stars" },
  ];
  const filtersCategory = [
    { name: "Rating" },
    { name: "Brand" },
    { name: "Category" },
  ];

  const handleFilterClick = () => {
    dispatch({ type: "OPEN_FILTER_MENU" });
    if (filterStatus.isFilterActive === true) {
      dispatch({ type: "CLOSE_FILTER_MENU" });
      dispatch({ type: "CLOSE_CATEGORY_LIST" });
    }
  };

  const handleCategoryClick = () => {
    dispatch({ type: "OPEN_CATEGORY_LIST" });

    if (filterStatus.isCategoryClicked === true) {
      dispatch({ type: "CLOSE_CATEGORY_LIST" });
    }
  };

  const handleSingleLabel = () => {
    dispatch({ type: "CLOSE_CATEGORY_LIST" });
    dispatch({ type: "CLOSE_FILTER_MENU" });
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
                onClick={handleCategoryClick}
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
          {starFilters.map((item, index) => (
            <label
              className={styles.filter}
              key={index}
              onClick={handleSingleLabel}
            >
              {item.phrase}
            </label>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FilterList;
