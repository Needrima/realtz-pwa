import React, { useEffect, useState } from 'react'
import Catalogue from '../../components/Catalogue/Catalogue'
import Layout from '../../components/Layout'
import { useSearchParams } from 'react-router-dom'
import { axiosProductInstance } from '../../api/axoios'
import { useSelector } from 'react-redux'
import { token } from '../../api/token'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const reference = searchParams.get('reference');
  // const {token} = useSelector(state => state.authReducer)

  const [state, setState] = useState({
    loading: true,
    productsData: null,
    products: [],
  })
  const {products, productsData, loading} = state;

  const getUserProducts = async (page) => {
    try {
        const {data} = await axiosProductInstance.get(
            `auth/get-user-products/${reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
                headers: {
                    token: token(),
                }
            })
        setState(state => ({
            ...state,
            loading: false,
            productsData: data,
            products: [...state.products, ...data.products],
        }))
    }catch(error) {
        console.log(error)
    }
  }

  const getLikedProducts = async (page) => {
      try {
          const {data} = await axiosProductInstance.get(
              `auth/get-liked-products/${reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
                  headers: {
                      token: token(),
                  }
              })
          setState(state => ({
              ...state,
              loading: false,
              productsData: data,
              products: [...state.products, ...data.products],
          }))
      }catch(error) {
          console.log(error)
      }
  }

  const getHomeProducts = async (page) => {
    try {
      const {data} = await axiosProductInstance.get(`auth/get-home-product/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
          headers: {
            token: token()
          }
        }
      )

      setState((state) => ({
        ...state,
        loading: false,
        productsData: data,
        products: [...state.products, ...data.products],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedProducts = async (page) => {
    try {
      const {data} = await axiosProductInstance.get(`auth/get-saved-product/${reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
          headers: {
            token: token()
          }
        }
      )

      setState((state) => ({
        ...state,
        loading: false,
        productsData: data,
        products: [...state.products, ...data.products],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getNextFunc = () => {
    switch(type) {
      case 'user':
        return getUserProducts
      case 'liked':
        return getLikedProducts
      case 'saved':
        return getSavedProducts
      default:
        return getHomeProducts
    }
  }

useEffect(() => {
  if (type) {
    switch(type) {
      case 'user':
        getUserProducts(1)
        break;
      case 'liked':
        getLikedProducts(1)
        break;
      case 'saved':
        getSavedProducts(1)
      default: getHomeProducts(1)
    }
  }
}, [reference, type])

  return (
    <Layout>
      <div className='px-3 py-2 vh-100'>
        <Catalogue
          products={products}
          productsData={productsData}
          nextFunc={getNextFunc()}
          loading={loading}
        />
      </div>
    </Layout>
  )
}

export default Products