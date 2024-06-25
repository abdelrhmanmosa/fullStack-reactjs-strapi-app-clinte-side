import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
