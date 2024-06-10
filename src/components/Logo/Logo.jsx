import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-[#fff] to-[#fff] text-transparent bg-clip-text hover:cursor-pointer"
    >
      {/* <img
        src="/logohackathon.png"
        style={{
          width: 40,
          height: 40,
          alignSelf: "center",
        }}
      ></img>{" "} */}
      Quick Craft
    </Link>
  );
};

export default Logo;
