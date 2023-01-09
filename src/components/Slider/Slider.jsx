import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const Slider = () => {
  const [isStoppedInterval, setIsStoppedInterval] = useState(false);
  const [value, setValue] = useState(0);
  let interval = () => {};
  const phrases = ["ho fame", "ho sete", "ho sonno"];

  useEffect(() => {
    if (!isStoppedInterval) {
      interval = setInterval(() => {
        setValue((prev) => prev + 1);
      }, 5000);

      if (value === 2) {
        setTimeout(() => {
          setValue(0);
        }, 5000);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [value, isStoppedInterval]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider_container}>
        {phrases?.map((item, index) => (
          <div
            style={{ right: `${value * 100}vw` }}
            className={styles.phrase_container}
            key={index}
          >
            <p>{phrases[index]}</p>

            {/* <div className={styles.overlay_gradient} />
          <img
            className={styles.background}
            src={item.cover_image_url + "?w=1080"}
            alt="heroimg"
          /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
