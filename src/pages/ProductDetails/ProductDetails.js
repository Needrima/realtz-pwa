import React, { createContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ProductDetailsLayout from '../../components/ProductDetails/ProductDetailsLayout'
import { useParams } from 'react-router-dom';
import { axiosProductInstance, axiosUserInstance } from '../../api/axoios';
import { useSelector } from 'react-redux';
import { token } from '../../api/token';
import autoLogout from '../../components/Hoc/AutoLogout/AutoLogout';

export const productDetailsContext = createContext();
const ProductDetails = () => {
  // const {token} = useSelector(state => state.authReducer)
  const {reference} = useParams()
  const [state, setState] = useState({
    loading: true,
    product: null,
    owner: null,
    loadingOwner: true,
  })
  const {product, loading, owner, loadingOwner} = state;

  const fetchSingleProduct = async () => {
    try {
      const {data} = await axiosProductInstance.get(`${reference}`)
      setState(state => ({
        ...state,
        product: data?.product,
        loading: false,
      }))
    }catch(error) {
      console.log(error)
    }
  }

  const getUser = async () => {
    try {
      const { data } = await axiosUserInstance.get(
        `auth/get-user/${product?.user_reference}`,
        {
          headers: {
            token: token(),
          },
        }
      );
      setState((state) => ({
        ...state,
        loadingOwner: false,
        owner: data.user,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [reference])

  useEffect(() => {
    getUser()
  }, [product])

  return (
    <productDetailsContext.Provider value={{
      product,
      loading,
      owner, 
      loadingOwner
    }}>
        <Layout>
            <ProductDetailsLayout />
        </Layout>
    </productDetailsContext.Provider>
  )
}

export default autoLogout(ProductDetails)