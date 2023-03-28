import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { memo, useCallback } from "react";

const Modal = ({ modalVisibilityTrue, page = "", children }) => {
  const dispatch = useDispatch();

  const { makeupData, cartData, userData } = useSelector((state) => state);

  const handleOnModalOverlayClick = useCallback(() => {
    if (modalVisibilityTrue === cartData.purchaseModalVisibility) {
      dispatch({ type: "SET_PURCHASE_MODAL_OFF" });
    } else if (modalVisibilityTrue === userData.loginModalVisibility) {
      dispatch({ type: "SET_LOGIN_MODAL_OFF" });
    } else if (modalVisibilityTrue === makeupData.imgZoomModalVisibility) {
      dispatch({ type: "SET_ZOOM_MODAL_OFF" });
    }
  }, []);

  return (
    <div
      className={`${styles.modalOverlay} ${
        page === "sharedLayoutPage" && styles.sharedLayoutPage
      }`}
      onClick={handleOnModalOverlayClick}
    >
      <div
        className={`${styles.modal}  ${
          page === "singleProductPage" && styles.singleProductPage
        } ${modalVisibilityTrue ? styles.active : ""}`}
      >
        {children}
      </div>
    </div>
  );
};
export default memo(Modal);
