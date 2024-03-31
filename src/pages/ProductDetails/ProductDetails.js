import React, { createContext } from 'react'
import Layout from '../../components/Layout'
import ProductDetailsLayout from '../../components/ProductDetails/ProductDetailsLayout'

export const productDetailsContext = createContext();
const ProductDetails = () => {
  return (
    <productDetailsContext.Provider value={{

    }}>
        <Layout>
            <ProductDetailsLayout />
        </Layout>
    </productDetailsContext.Provider>
  )
}

export default ProductDetails