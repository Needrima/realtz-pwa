import React, { useContext } from 'react'
import './Page1.scss'
import { LandingPageContext } from '../../../pages/LandingPage/LandingPage'

const Page1 = () => {
  const {changeScreen} = useContext(LandingPageContext);
  return (
    <>
        <h1 className='fw-bold mb-4'>Find the best place <br />to live <span className='text-default'>comfortably</span></h1>

        <div className='mb-5 text-muted'>Lorem ipsum dolor sit amet, consectur <br /> adipiscing elit, sed.</div>

        <div className='bg-img-div bg-img rounded-4 d-flex align-items-end justify-content-center pb-5'>
            <button 
            className='btn text-light bg-default fw-bold px-5 py-3 fs-4' 
            onClick={() => changeScreen("2")}>
              Next
            </button>
        </div>
    </>
  )
}

export default Page1