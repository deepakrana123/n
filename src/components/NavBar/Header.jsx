import React from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import Alert from "../Alert/Alert";
// import ThemeSwitcher from "../tabs/Tab";
import Logout from "./Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const user = JSON.parse(JSON.stringify(useSelector((state) => state.screen.user)));
  return (
    <React.Fragment>
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
         {Object.keys(user).length>0? <Logout />:""}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
