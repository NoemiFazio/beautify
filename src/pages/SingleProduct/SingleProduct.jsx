// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { Navigate, useNavigate } from "react-router";

// import { useDispatch, useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ImEnlarge } from "react-icons/im";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import styles from "./index.module.scss";

const SingleProduct = ({
  setTypeKey,
  setBrandKey,
  setLabelBrandValue,
  setLabelCategoryValue,
  labelCategoryValue,
  labelBrandValue,
}) => {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLabelClick = (category, type) => {
    const key = category.split("_").join("%20");
    if (type === "brand") {
      navigate("/");
      setTypeKey("");
      setBrandKey(key);
      setLabelBrandValue(category);
      // console.log(category);
      // console.log(labelBrandValue);
    } else {
      navigate("/");
      setBrandKey("");
      setTypeKey(key);
      setLabelCategoryValue(category);
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

  return (
    <div className={styles.SingleProduct}>
      <div className={styles.specsDiv}>
        <span
          className={styles.specsSpan}
          onClick={() => handleLabelClick(brand, "brand")}
        >
          {brand}
        </span>
        <span className={styles.specsSpan}>
          <h4 className={styles.specsH4}>/</h4>
        </span>

        <span
          className={styles.specsSpan}
          onClick={() => handleLabelClick(product_type, "productType")}
        >
          {product_type?.split("_")?.join(" ")}
        </span>
      </div>
      <h2 className={styles.name}>{name}</h2>
      <h4 className={styles.price}>
        {" "}
        {price_sign === null
          ? `${price}0 €
          `
          : `${price}0 ${price_sign?.split("£")?.join("€")}`}
      </h4>
      <div className={styles.imgDiv}>
        <img src={api_featured_image} className={styles.img} alt="" />

        <ImEnlarge className={styles.enlargeIcon} />
      </div>
      <div className={styles.btnDiv}>
        <button className={styles.addToBagBtn} onClick={handleOnCartClick}>
          Add to bag
        </button>
        <button className={styles.addToFave}>
          <h5>Add to favourites</h5>
          {!makeupData.favourites.find((item) => item.id === id) ? (
            <RiHeart3Line
              onClick={handleWishListBtn}
              className={styles.wishListBtn}
            />
          ) : (
            <RiHeart3Fill
              onClick={handleWishListBtn}
              className={`${styles.wishListBtn} ${styles.active}`}
            />
          )}{" "}
        </button>
      </div>
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
        {console.log(product)}
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.tagsDiv}>
        {" "}
        {tag_list && tag_list.map((item, index) => <h5 key={index}>{item}</h5>)}
      </div>
      <Link to="/">Torna alla home</Link>
    </div>
  );
};

export default memo(SingleProduct);
