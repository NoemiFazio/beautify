import styles from "./index.module.scss";
import { useRef, memo } from "react";
import CarouselCard from "../CarouselCard";
// import GET from "../../utils/GET/GET";
import { useSelector, useDispatch } from "react-redux";
// import { IMPORT_URL } from "../../utils/GET/URL";
import ScrollBtn from "../ScrollBtn";

const Carousel = ({ data, type }) => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  // const { cartData } = useSelector((state) => state);

  // useEffect(() => {
  //   GET(
  //     IMPORT_URL.ACTIVITIES,
  //     "?discounted=YES&limit=20",
  //     dispatch,
  //     "SET_DISCOUNT_LIST",
  //     lang,
  //     currency
  //   );
  // }, [dispatch, lang, currency]);
  // function getOccurrence(array, value) {
  //   return array.filter((v) => v === value).length;
  // }

  return (
    <div className={styles.Carousel}>
      {/* <div className={styles.title}>  */}
      {/* <h3>{type}</h3> */}

      {/* </div> */}
      {
        <div className={styles.title}>
          <h3>{type}</h3>
          <ScrollBtn itemRef={carouselRef} />
        </div>
      }
      <div
        // ref={miniCarouselRef}
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
        {/* {activities?.discountList?.data?.map((cardData, index) => (
          <MiniCard cardData={cardData} key={index} />
        ))} */}
      </div>
    </div>
  );
};

export default memo(Carousel);
