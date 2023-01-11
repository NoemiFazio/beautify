import { useState, useEffect } from "react";
import { CgAirplane } from "react-icons/cg";
import { GoMegaphone } from "react-icons/go";
import { BiWinkSmile } from "react-icons/bi";
import styles from "./index.module.scss";

const Slider = () => {
  const [value, setValue] = useState(0);
  let interval = () => {};
  const phrases = [
    {
      phrase: "SPEDIZIONE GRATUITA CON ORDINI > 1.99€",
      icon: <CgAirplane className={styles.icon} />,
    },
    {
      phrase: "TAROCCHI ORIGINALI DELLA FIERA",
      icon: <BiWinkSmile className={styles.icon} />,
    },
    {
      phrase: "VENGHINO SIGNOR*, VENGHINO!",
      icon: <GoMegaphone className={styles.icon} />,
    },
  ];

  useEffect(() => {
    if ((value >= 0) & (value <= 2)) {
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
  }, [value]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider_container}>
        {phrases?.map((item, index) => (
          <div
            style={{ right: `${value * 100}vw` }}
            className={styles.phrase_container}
            key={index}
          >
            <p>
              {item.phrase}
              {item.icon}
            </p>

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
