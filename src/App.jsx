// import styles from "./App.module.scss";
// import MakeupList from "./components/MakeupList";
// import Slider from "./components/Slider";
// import Navbar from "./components/Navbar";
// import FilterList from "./components/FilterList";
import { memo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
// import Navbar from "./components/Navbar";
// import { useSelector, useDispatch } from "react-redux";

function App() {
  // const { filterStatus } = useSelector((state) => state);
  // const dispatch = useDispatch();
  // const [typeKey, setTypeKey] = useState("Nail polish");
  // const [brandKey, setBrandKey] = useState("");

  // const handleOverlayClick = () => {
  //   dispatch({ type: "CLOSE_FILTER_MENU" });
  //   dispatch({ type: "CLOSE_CATEGORY_LIST" });
  // };

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          {/* In verità per il route qui sotto si poteva fare il nesting come in riga 31, ma funziona anche così */}
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default memo(App);
