import { memo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  const [user, setUser] = useState(null);
  const [typeKey, setTypeKey] = useState("");
  const [brandKey, setBrandKey] = useState("");
  const [labelCategoryValue, setLabelCategoryValue] = useState("");
  const [labelBrandValue, setLabelBrandValue] = useState("");

  return (
    <BrowserRouter>
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <Home
                  typeKey={typeKey}
                  setTypeKey={setTypeKey}
                  brandKey={brandKey}
                  setBrandKey={setBrandKey}
                  labelCategoryValue={labelCategoryValue}
                  setLabelCategoryValue={setLabelCategoryValue}
                  labelBrandValue={labelBrandValue}
                  setLabelBrandValue={setLabelBrandValue}
                />
              }
            />
            <Route path="cart" element={<Cart />} />
            <Route path="products" element={<Products />} />
            {/* <Route path='products' element={<SharedProductLayout/>}>
            <Route index element={<Products/>} />
            <Route path=':productId' element={<Singleroduct/>} />
          </Route> */}
            {/* In verità per il route qui sotto si poteva fare il nesting come in riga 31, come ho scritto nelle 4 righe precedenti,  ma funziona anche così */}
            <Route
              path="products/:productId"
              element={
                <SingleProduct
                  typeKey={typeKey}
                  setTypeKey={setTypeKey}
                  brandKey={brandKey}
                  setBrandKey={setBrandKey}
                  setLabelCategoryValue={setLabelCategoryValue}
                  setLabelBrandValue={setLabelBrandValue}
                  labelCategoryValue={labelCategoryValue}
                  labelBrandValue={labelBrandValue}
                />
              }
            />
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default memo(App);
