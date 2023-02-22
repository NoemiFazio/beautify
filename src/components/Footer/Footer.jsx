import styles from "./index.module.scss";
import { memo } from "react";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  const socialIconsArr = [
    { name: "Facebook", icon: <FaFacebookF className={styles.icon} /> },
    { name: "Instagram", icon: <AiFillInstagram className={styles.icon} /> },
    { name: "Twitter", icon: <AiOutlineTwitter className={styles.icon} /> },
    { name: "Youtube", icon: <AiFillYoutube className={styles.icon} /> },
    { name: "Tiktok", icon: <FaTiktok className={styles.icon} /> },
    ,
  ];
  const footerCredits = [
    { text: "ABOUT" },
    { text: "FAQ" },
    { text: "TERMS" },
    { text: "CONTACT US" },
    { text: "Built with React.js ❤️ By Fazio Noemi" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.socialsDiv}>
        {socialIconsArr.map((item, index) => (
          <span className={styles.iconSpan} key={index}>
            {item.icon}
          </span>
        ))}
      </div>
      <div className={styles.creditsDiv}>
        {footerCredits.map((item, index) => (
          <h4 className={styles.footerCredit} key={index}>
            {item.text}
          </h4>
        ))}
      </div>
    </footer>
  );
};
export default memo(Footer);
