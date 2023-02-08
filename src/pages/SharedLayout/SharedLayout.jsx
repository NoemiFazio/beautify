import Navbar from "../../components/Navbar";
import { memo } from "react";
import { Outlet } from "react-router";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default memo(SharedLayout);
