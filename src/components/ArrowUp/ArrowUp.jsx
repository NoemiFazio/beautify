import styles from "./index.module.scss";
import { GoArrowSmallUp } from "react-icons/go";
import { useEffect, useState, memo, useCallback } from "react";

export default memo(function ArrowUp() {
  const [isVisible, setIsVisible] = useState(false);

  const eventScrollUp = useCallback(() => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else if (window.scrollY === 0) {
      setIsVisible(false);
    }
  }, []);

  const handleOnArrowClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => eventScrollUp());
    }
    return window.removeEventListener("scroll", () => eventScrollUp());
  }, []);

  return (
    <div
      type="ArrowUp button"
      aria-label="ArrowUp button"
      aria-required="true"
      name="ArrowUp button"
      onClick={handleOnArrowClick}
      className={`${styles.arrow} ${isVisible ? styles.active : ""}`}
    >
      <GoArrowSmallUp className={styles.icon} />
      {/* <div className={styles.overlay} /> */}
    </div>
  );
});
