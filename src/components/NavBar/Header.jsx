import React from "react";

import Logo from "../Logo/Logo";

import Logout from "./Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const user = JSON.parse(
    JSON.stringify(useSelector((state) => state.screen.user))
  );
  return (
    <React.Fragment>
      <nav className="flex items-center  h-[50px] px-4 py-2 fixed top-0 z-10  justify-between w-full bg-gradient-to-r to-[#c8b9ec] from-[#6a6db0]">
        <Logo />
        <div className="flex gap-4 items-center">
          {Object.keys(user).length > 0 ? <Logout /> : ""}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
