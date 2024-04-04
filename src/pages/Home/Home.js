import Layout from "../../components/Layout";
import React, { createContext, useEffect, useState } from "react";
import HomeLayout from "../../components/Home/HomeLayout";
import { axiosProductInstance } from "../../api/axoios";
import { useSelector } from "react-redux";

export const HomeContext = createContext(null);
const Home = () => {
  const { token } = useSelector((state) => state.authReducer);
  console.log(parseInt(process.env.REACT_APP_POPUP_TIMEOUT))

  const [state, setState] = useState({
    tab: "home",
    homeProductsData: null,
    homeProducts: [],
    trendingProductsData: null,
    trendingProducts: [],
  });
  const {
    tab,
    homeProductsData,
    trendingProductsData,
    homeProducts,
    trendingProducts,
  } = state;

  const changeTab = (tab) => {
    setState((state) => ({
      ...state,
      tab: tab,
    }));
  };

  const getHomeProducts = async (page) => {
    try {
      const {data} = await axiosProductInstance.get(`auth/get-home-product/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
          headers: {
            token: token
          }
        }
      )

      setState((state) => ({
        ...state,
        homeProductsData: data,
        homeProducts: [...state.homeProducts, ...data.products],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingProducts = async (page) => {
    try {
      const {data} = await axiosProductInstance.get(`auth/get-trending-product/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
          headers: {
            token: token
          }
        }
      );

      setState((state) => ({
        ...state,
        trendingProductsData: data,
        trendingProducts: [...state.trendingProducts, ...data.products],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeProducts(1);
    getTrendingProducts(1);
  }, [token]);

  return (
    <HomeContext.Provider
      value={{
        tab,
        changeTab,
        homeProductsData,
        trendingProductsData,
        homeProducts,
        trendingProducts,
        getHomeProducts,
        getTrendingProducts,
      }}
    >
      <Layout>
        <HomeLayout />
      </Layout>
    </HomeContext.Provider>
  );
};

export default Home;
