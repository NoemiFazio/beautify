import styles from "./index.module.scss";

const FilterList = () => {
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

  return (
    <div className={styles.FilterList}>
      <div className={styles.mainDiv}>
        <button className={styles.filterBtn}>
          <p>Filters</p>
          <p>+</p>
        </button>
        <div className={styles.categories}>
          {filtersCategory.map((item, index) => (
            <label className={styles.category}>{item.name}</label>
          ))}
        </div>
      </div>
      <div className={styles.filtersDiv}>
        {starFilters.map((item, index) => (
          <label className={styles.filter}>{item.phrase}</label>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
