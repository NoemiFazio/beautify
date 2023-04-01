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
        <div
          type={`title div`}
          aria-label={`title div`}
          aria-required="true"
          name={`title div`}
          className={styles.title}
        >
          <h3
            type={`carousel title: ${type}`}
            aria-label={`carousel title: ${type}`}
            aria-required="true"
            name={`carousel title: ${type}`}
          >
            {type}
          </h3>
          <ScrollBtn itemRef={carouselRef} />
        </div>
      }
      <div
        type={`main content div`}
        aria-label={`main content div`}
        aria-required="true"
        name={`main content div`}
        className={styles.mainContentDiv}
        ref={carouselRef}
      >
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

export default Carousel;
