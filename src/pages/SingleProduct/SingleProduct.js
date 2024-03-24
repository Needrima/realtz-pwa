import React, { createContext, useEffect, useState } from 'react'
import SingleProductLayout from '../../components/SingleProduct/SingleProductLayout';
import { useParams } from 'react-router-dom';
import { axiosProductInstance } from '../../api/axoios';

export const SingleProductContext = createContext();
const SingleProduct = () => {
  const {reference} = useParams()
  console.log(reference)
  const [state, setState] = useState({
    product: null,
  })
  const {product} = state;

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const {data} = await axiosProductInstance.get(`${reference}`)
        setState(state => ({
          ...state,
          product: data?.product,
        }))
      }catch(error) {
        console.log(error)
      }
    }
    fetchSingleProduct();
  }, [reference])

  return (
    <SingleProductContext.Provider value={{
      product,
    }}>
      <SingleProductLayout />
    </SingleProductContext.Provider>
  )
}

export default SingleProduct