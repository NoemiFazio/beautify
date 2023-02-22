import styles from "./index.module.scss";
import Navbar from "../../components/Navbar";
import { memo } from "react";
import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default memo(SharedLayout);
