import React from "react";
import Particles from "./Particles";

function LoginNew({ children }) {
  return (
    <div
      className="container"
      style={{
        display: "flex",
      }}
    >
      <div className="left">
        <div className="login-section">
          <header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <img
                src="/logohackathon.png"
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                }}
              ></img>
            </div>
            {/* <h2 className="animation a1">Quick Craft</h2> */}
            <h4 className="animation a1">
              Welcome back, Please login to your account
            </h4>
          </header>
          {children}
          {/* <form>
            <input
              type="email"
              placeholder="Email"
              className="input-field animation a3"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field animation a4"
            />
            <p className="animation a5">
              <a href="#">Forgot password?</a>
            </p>
            <button className="animation a6">Sign in</button>
          </form> */}
        </div>
      </div>
      <div className="right">{/* <Particles className="right" /> */}</div>
    </div>
  );
}

export default LoginNew;
