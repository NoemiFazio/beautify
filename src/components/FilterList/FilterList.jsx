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
      <span>
        <p>Filters</p>
        <p>+</p>
      </span>
      <div>
        {filtersCategory.map((item, index) => (
          <p>{item.name}</p>
        ))}
      </div>
      <div>
        {starFilters.map((item, index) => (
          <p>{item.phrase}</p>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
