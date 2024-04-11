import React, { createContext, useEffect, useState } from 'react'
import { axiosProductInstance } from '../../api/axoios'
import { useSelector } from 'react-redux'
import Catalogue from '../../components/Catalogue/Catalogue'
import Layout from '../../components/Layout'
import { Input } from 'antd'
import './explore.scss'
import { token } from '../../api/token'

export const exploreContext = createContext()
const Explore = () => {
    // const {token} = useSelector(state => state.authReducer)
    const [state, setState] = useState({
        productsData: null,
        products: [],
        loading: true
    })

    const {products, productsData, loading} = state;

    const getProducts = async (page) => {
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

    let typingTimer = 1000
    let typingTimeout = null;

    const isTyping = (e) => {
      clearTimeout(typingTimeout)
      typingTimeout = setTimeout(() => search(e.target.value), typingTimer)
    }

    const stoppedTyping = () => {
      clearTimeout(typingTimeout)
    }

    const search = (value) => {
      setState(state => ({
        ...state,
        loading: true
      }))
      console.log('seaching for:', value)
    }

    useEffect(() => {
      getProducts(1)
    }, [])
      
  return (
    <Layout>
        <div className='p-2 vh-100'>
            {!loading && <Input 
                className='mb-2 search-input py-2 border border-1 border-secondary'
                suffix={<i className="bi bi-search"></i>}
                onKeyUp={isTyping}
                onKeyDown={stoppedTyping}
            />}
            
            <Catalogue
            products={products}
            productsData={productsData}
            nextFunc={getProducts}
            loading={loading}
            />
        </div>
    </Layout>
  )
}

export default Explore