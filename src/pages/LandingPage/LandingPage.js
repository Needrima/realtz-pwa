import React, { createContext } from "react";
import "./LandingPage.scss";
import { useState } from "react";
import Screen1 from "../../components/LandingPage/Screen1/Screen1";
import Screen2 from "../../components/LandingPage/Screen2/Screen2";
import Screen3 from "../../components/LandingPage/Screen3/Screen3";
import { useNavigate } from "react-router-dom";

export const LandingPageContext = createContext(null);

const LandingPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    screen: "1",
  });

  const { screen } = state;

  const changeScreen = (screen) => {
    setState((state) => ({
      ...state,
      screen: screen,
    }));
  };

  const renderPage = () => {
    switch (screen) {
      case "1":
        return <Screen1 />;
      case "2":
        return <Screen2 />;
      case "3":
        return <Screen3 />;
      default:
        return <Screen1 />;
    }
  };
  return (
    <LandingPageContext.Provider
      value={{
        changeScreen,
      }}
    >
      <div className="landing-page px-2 pt-5 pb-3">
        <div
          className="d-flex justify-content-between align-items-center mb-5"
          id="#logo-header"
        >
          <div className="fw-bold fs-2 text-muted">Logo</div>
          <button
            className="btn badge text-light bg-default-dark rounded-4 px-4 py-2 fs-4"
            onClick={() => navigate("/login", { replace: true })}
          >
            Login
          </button>
        </div>

        {renderPage()}
      </div>
    </LandingPageContext.Provider>
  );
};

export default LandingPage;
