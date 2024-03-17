import React, { useState, createContext } from "react";
import Screen1 from "../../components/Login/Screen1/Screen1";
import Screen2 from "../../components/Login/Screen2/Screen2";

export const LoginContext = createContext(null);

const Login = () => {
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
      default:
        return <Screen1 />;
    }
  };

  return (
    <LoginContext.Provider value={changeScreen}>
      <div className="login">{renderPage()}</div>
    </LoginContext.Provider>
  );
};

export default Login;
