import React from 'react'
import './AddProductLayout.scss'

const AddProductLayout = ({children}) => {
    
  return (
    <div className='p-2 add-product-layout'>
        <h1 className='fw-bold text-primary mt-3 text-center'>Add Listing</h1>
        {children}
    </div>
  )
}

export default AddProductLayout