import Layout from "../../components/Layout";
import React, { createContext, useEffect, useState } from "react";
import HomeLayout from "../../components/Home/HomeLayout";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export const HomeContext = createContext(null);
const Home = () => {
  const [state, setState] = useState({
    tab: "home",
    homeProductsData: null,
    homeProducts: [],
    trendingProductsData: null,
    trendingProducts: []
  });
  const { tab, homeProductsData, trendingProductsData, homeProducts, trendingProducts } = state;

  const changeTab = (tab) => {
    setState((state) => ({
      ...state,
      tab: tab,
    }));
  };

  useEffect(() => {
    
  }, [tab])

  return (
    <HomeContext.Provider
      value={{
        tab,
        changeTab,
        homeProductsData,
        trendingProductsData,
        homeProducts, 
        trendingProducts
      }}
    >
      <Layout>
          <HomeLayout />
      </Layout>
    </HomeContext.Provider>
  );
};

export default Home;
