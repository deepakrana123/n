import React, { Component, createContext, useContext, useState } from "react";
export const AppContext = createContext();
export const ParentComponent = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        setLoading,
        loading,
      }}
    >
      {loading ? (
        <div
          style={{
            zIndex: 100000,
            position: "absolute",
            backgroundColor: "#00000097",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className="container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div
              style={{
                marginTop: 50,
              }}
            >
              Loading, Please Wait...
            </div>
          </div>
          <svg width="0" height="0" className="svg">
            <defs>
              <filter id="uib-jelly-ooze">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="3"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="ooze"
                />
                <feBlend in="SourceGraphic" in2="ooze" />
              </filter>
            </defs>
          </svg>
        </div>
      ) : null}
      {children}
    </AppContext.Provider>
  );
};

export default ParentComponent;
