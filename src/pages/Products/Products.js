import React, { useEffect, useState } from 'react'
import Catalogue from '../../components/Catalogue/Catalogue'
import Layout from 'antd/es/layout/layout'
import { useParams, useSearchParams } from 'react-router-dom'
import { axiosProductInstance } from '../../api/axoios'
import { useSelector } from 'react-redux'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const reference = searchParams.get('reference');
  console.log(type, reference)
  const {token} = useSelector(state => state.authReducer)

  const [state, setState] = useState({
    loading: true,
    productsData: null,
    products: [],
  })
  const {products, productsData, loading} = state;

  const getUserProducts = async (page) => {
    console.log('getting user product')
    try {
        const {data} = await axiosProductInstance.get(
            `auth/get-user-products/${reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
                headers: {
                    token: token,
                }
            })
        setState(state => ({
            ...state,
            loading: false,
            productsData: data,
            products: [...state.products, ...data.products],
        }))
        console.log('user data:', data)
    }catch(error) {
        console.log(error)
    }
  }

  const getLikedProducts = async (page) => {
    console.log('getting liked product')
      try {
          const {data} = await axiosProductInstance.get(
              `auth/get-liked-products/${reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
                  headers: {
                      token: token,
                  }
              })
          setState(state => ({
              ...state,
              loading: false,
              productsData: data,
              products: [...state.products, ...data.products],
          }))
          console.log('liked product data:', data)
      }catch(error) {
          console.log(error)
      }
  }

  const getHomeProducts = async (page) => {
    console.log('getting home product')
    try {
      const {data} = await axiosProductInstance.get(`auth/get-home-product/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
          headers: {
            token: token
          }
        }
      )

      setState((state) => ({
        ...state,
        loading: false,
        productsData: data,
        products: [...state.products, ...data.products],
      }));
      console.log('home product data:', data)
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
      default: getHomeProducts(1)
    }
  }
}, [reference, type, token])

  return (
    <Layout>
      <div className='px-3 py-2 vh-100'>
        <Catalogue
          products={products}
          productsData={productsData}
          nextFunc={getNextFunc()}
        />
      </div>
    </Layout>
  )
}

export default Products