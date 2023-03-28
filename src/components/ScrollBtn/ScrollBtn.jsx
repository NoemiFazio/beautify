import styles from "./index.module.scss";
import { memo } from "react";
import { GoArrowSmallLeft, GoArrowSmallRight } from "react-icons/go";

export default memo(function ScrollBtn({ itemRef }) {
  const onNextClick = () => {
    itemRef.current.scrollTo({
      top: 0,
      left: itemRef.current.scrollLeft + 570,
      behavior: "smooth",
    });
  };

  const onPrevClick = () => {
    itemRef.current.scrollTo({
      top: 0,
      left: itemRef.current.scrollLeft - 570,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.button_container_scroll}>
      <button onClick={onPrevClick} className={styles.button_prev}>
        <GoArrowSmallLeft className={styles.icon} />
      </button>
      <button onClick={onNextClick} className={styles.button_next}>
        <GoArrowSmallRight className={styles.icon} />
      </button>
    </div>
  );
});
