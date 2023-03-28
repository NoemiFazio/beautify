import styles from "./index.module.scss";
import { useRef, memo } from "react";
import CarouselCard from "../CarouselCard";
import ScrollBtn from "../ScrollBtn";

const Carousel = ({ data, type }) => {
  const carouselRef = useRef(null);

  return (
    <div
      type={`${type} carousel`}
      aria-label={`${type} carousel`}
      aria-required="true"
      name={`${type} carousel`}
      className={styles.Carousel}
    >
      {
        <div className={styles.title}>
          <h3>{type}</h3>
          <ScrollBtn itemRef={carouselRef} />
        </div>
      }
      <div className={styles.mainContentDiv} ref={carouselRef}>
        {type === "beautycase"
          ? data
              ?.filter((value, index, self) => self.indexOf(value) === index)
              .map((item, index) => (
                <CarouselCard key={index} cardData={item} type={type} />
              ))
          : data?.map((item, index) => (
              <CarouselCard key={index} cardData={item} type={type} />
            ))}
      </div>
    </div>
  );
};

export default memo(Carousel);
