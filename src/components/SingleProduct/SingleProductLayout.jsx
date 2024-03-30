import React, { useContext } from 'react'
import Product from './Product'
import { SingleProductContext } from '../../pages/SingleProduct/SingleProduct'
import { Spin } from 'antd'
import CustomSpin from '../UI/CustomSpin/CustomSpin'

const SingleProductLayout = () => {
  const {product} = useContext(SingleProductContext)
  return (
    <div className='bg-dark vh-100'>
        {product ? <Product product={product} /> : <div className='text-light fw-bold fs-3 me-3 product-loading-center'>Loading <CustomSpin color={'white'} spinning={true} /></div>}
    </div>
  )
}

export default SingleProductLayout