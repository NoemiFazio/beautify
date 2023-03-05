import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Modal = ({ modalVisibilityTrue, children }) => {
  const dispatch = useDispatch();
  const { makeupData, cartData } = useSelector((state) => state);

  const handleOnModalOverlayClick = () => {
    if (modalVisibilityTrue === cartData.purchaseModalVisibility)
      dispatch({ type: "SET_PURCHASE_MODAL_OFF" });
  };

  //   useEffect(() => {
  //     console.log(modalVisibilityTrue);

  //     if (modalVisibilityTrue === true) {
  //       window.document.body.style.overflowY = "hidden";
  //       console.log(modalVisibilityTrue);
  //     } else {
  //       window.document.body.style.overflowY = "scroll";
  //       console.log(modalVisibilityTrue);
  //     }
  //   }, [modalVisibilityTrue]);

  return (
    <div className={styles.modalOverlay} onClick={handleOnModalOverlayClick}>
      <div
        className={`${styles.modal} ${
          modalVisibilityTrue ? styles.active : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
