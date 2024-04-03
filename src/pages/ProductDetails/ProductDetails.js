import React, { createContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ProductDetailsLayout from '../../components/ProductDetails/ProductDetailsLayout'
import { useParams } from 'react-router-dom';
import { axiosProductInstance, axiosUserInstance } from '../../api/axoios';
import { useSelector } from 'react-redux';

export const productDetailsContext = createContext();
const ProductDetails = () => {
  const {token} = useSelector(state => state.authReducer)
  const {reference} = useParams()
  console.log(reference)
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
      console.log(data)
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
    console.log("getting user");
    try {
      const { data } = await axiosUserInstance.get(
        `auth/get-user/${product?.user_reference}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(data.user)
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
  }, [product, token])

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

export default ProductDetails