import Layout from "../../components/Layout";
import React, { createContext, useState } from "react";
import HomeLayout from "../../components/Home/HomeLayout";

export const HomeContext = createContext(null);
const Home = () => {
  const [state, setState] = useState({
    tab: "home",
  });
  const { tab } = state;

  const changeTab = (tab) => {
    setState((state) => ({
      ...state,
      tab: tab,
    }));
  };
  return (
    <HomeContext.Provider
      value={{
        tab,
        changeTab,
      }}
    >
      <Layout>
        <HomeLayout />
      </Layout>
    </HomeContext.Provider>
  );
};

export default Home;
