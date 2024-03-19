import Layout from "../../components/Layout";
import React, { createContext, useEffect, useState } from "react";
import HomeLayout from "../../components/Home/HomeLayout";

export const HomeContext = createContext(null);
const Home = () => {
  const [state, setState] = useState({
    tab: "home",
    productsData: null,
  });
  const { tab, productsData } = state;

  const changeTab = (tab) => {
    setState((state) => ({
      ...state,
      tab: tab,
    }));
  };

  useEffect(() => {}, [tab])
  return (
    <HomeContext.Provider
      value={{
        tab,
        changeTab,
        productsData
      }}
    >
      <Layout>
        <HomeLayout />
      </Layout>
    </HomeContext.Provider>
  );
};

export default Home;
