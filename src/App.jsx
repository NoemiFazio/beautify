// import styles from "./App.module.scss";
// import MakeupList from "./components/MakeupList";
// import Slider from "./components/Slider";
// import Navbar from "./components/Navbar";
// import FilterList from "./components/FilterList";
import { memo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ProductPage from "./pages/ProductPage";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default memo(App);
