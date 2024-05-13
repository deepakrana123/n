import React, { useState } from "react";

const FixedMobileScreen = ({ color, id }) => {
  console.log(id, color, "values");
  return (
    <div
      className="w-[375px] h-[612px]  shadow-md overflow-hidden"
      style={{
        backgroundImage: color,
      }}
    >
      <div className="p-8">
        <h1 className="text-white text-center text-3xl mb-6">
          Loan Application
        </h1>

        {id ? (
          <>
          
          <label>{id?.label}</label>
          <input
            type="text"
            placeholder={id?.placeholder}
            style={id?.style}
            // className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-md shadow-sm"
          />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FixedMobileScreen;
