import styles from "./index.module.scss";
import { memo } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ImEnlarge } from "react-icons/im";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";

import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";

const SingleProduct = ({
  setTypeKey,
  setBrandKey,
  setLabelBrandValue,
  setLabelCategoryValue,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { makeupData, userData } = useSelector((state) => state);

  const product = makeupData.makeup.find(
    (product) => product.id === +productId
  );

  const {
    name,
    product_type,
    price,
    price_sign,
    api_featured_image,
    brand,
    id,
    description,
    tag_list,
    product_colors,
  } = product;

  const handleLabelClick = (category, type) => {
    const key = category.split("_").join("%20");
    if (type === "brand") {
      setTypeKey("");
      setLabelCategoryValue("");
      setBrandKey(key);
      setLabelBrandValue(category);
      navigate("/");
      // console.log(category);
      // console.log(labelBrandValue);
    } else {
      setBrandKey("");
      setLabelBrandValue("");
      setTypeKey(key);
      setLabelCategoryValue(category);
      navigate("/");

      // console.log(category);
      // console.log(labelCategoryValue);
    }
  };

  const handleOnCartClick = () => {
    // dispatch({ type: "SET_TRUE" });
    if (userData.isLogged === false) {
      dispatch({ type: "SET_LOGIN_MODAL_ON" });
    } else if (userData.isLogged === true) {
      // dispatch({ type: "SET_LOGIN_MODAL_OFF" });
      dispatch({ type: "ADD_PRODUCT", payload: product });
    }
  };

  const handleWishListBtn = () => {
    if (userData.isLogged === false) {
      dispatch({ type: "SET_LOGIN_MODAL_ON" });
    } else {
      dispatch({ type: "SET_FAVORITE_MAKEUP", payload: product });
      localStorage.setItem("favourites", JSON.stringify(makeupData.favourites));

      if (makeupData.favourites.find((item) => item.id === id)) {
        dispatch({ type: "REMOVE_FAVORITE_MAKEUP", payload: id });
      }
    }
  };

  const onImgClick = () => {
    dispatch({ type: "SET_ZOOM_MODAL_ON" });
  };

  return (
    <div className={styles.SingleProduct}>
      {makeupData.imgZoomModalVisibility && (
        <Modal
          modalVisibilityTrue={makeupData.imgZoomModalVisibility}
          page="singleProductPage"
        >
          <img className={styles.cardImg} src={api_featured_image} alt="name" />
        </Modal>
      )}
      <h2 className={styles.name}>{name}</h2>
      <h4 className={styles.price}>
        {" "}
        {price_sign === null
          ? `${price}0 €
          `
          : `${price}0 ${price_sign?.split(`${price_sign}`)?.join("€")}`}
      </h4>
      <div className={styles.specsDiv}>
        <span
          className={styles.specsSpan}
          onClick={() => handleLabelClick(brand, "brand")}
        >
          {brand}
        </span>
        <span>
          <h4 className={styles.specsH4}>/</h4>
        </span>

        <span
          className={styles.specsSpan}
          onClick={() => handleLabelClick(product_type, "productType")}
        >
          {product_type?.split("_")?.join(" ")}
        </span>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.imgAndBtnsDiv}>
          <div className={styles.imgDiv}>
            <img
              src={api_featured_image}
              className={styles.img}
              alt={name}
              onClick={onImgClick}
            />

            <ImEnlarge className={styles.enlargeIcon} onClick={onImgClick} />
          </div>
          <div className={styles.btnDiv}>
            <Button handleOnClick={handleOnCartClick} type="cardBtn">
              Add to bag
            </Button>
            <button className={styles.addToFave} onClick={handleWishListBtn}>
              <h5>Add to favourites</h5>
              {!makeupData.favourites.find((item) => item.id === id) ? (
                <RiHeart3Line className={styles.wishListBtn} />
              ) : (
                <RiHeart3Fill
                  className={`${styles.wishListBtn} ${styles.active}`}
                />
              )}
            </button>
          </div>
        </div>
        <div className={styles.detailsDiv}>
          <div className={styles.coloursDiv}>
            {product_colors &&
              product_colors.map(
                (item, index) => (
                  <span
                    key={index}
                    className={styles.colourSpan}
                    style={{
                      backgroundColor: `${item.hex_value}`,
                    }}
                  ></span>
                )
                // console.log(item.hex_value)
              )}
          </div>
          <div className={styles.descriptionDiv}>
            <p className={styles.description}>{description}</p>
            <div className={styles.tagsDiv}>
              <span className={styles.tagsSpan}>
                {tag_list &&
                  tag_list.map((item, index) => <h5 key={index}>• {item}</h5>)}
              </span>
            </div>
          </div>
        </div>
        {/* <Link to="/">Torna alla home</Link> */}
      </div>
    </div>
  );
};

export default memo(SingleProduct);
