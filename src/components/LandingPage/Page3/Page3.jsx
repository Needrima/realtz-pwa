import React, { useContext } from 'react'
import './Page3.scss'
import { useNavigate } from 'react-router-dom'
import { LandingPageContext } from '../../../pages/LandingPage/LandingPage'

const Page3 = () => {
  const {changeScreen} = useContext(LandingPageContext);
  const navigate = useNavigate()
  return (
    <>
        <h1 className='fw-bold mb-4'>Find the <span className='text-default'>perfect choice</span> <br /> for your future house</h1>

        <div className='mb-5 text-muted'>Lorem ipsum dolor sit amet, consectur <br /> adipiscing elit, sed. page 3</div>

        <div className='bg-img-div bg-img rounded-4 d-flex flex-column align-items-center justify-content-end pb-5'>

            <div className='d-flex mb-2'>
              <div className="border border-2 border-light me-2 px-3"></div>
              <div className="border border-2 border-light me-2 px-3"></div>
              <div className="border border-2 border-primary px-3"></div>
            </div>

            <div>
              <button 
              className='btn text-light bg-default fw-bold py-3 px-4 fs-4 rounded-circle me-2' 
              onClick={() => changeScreen("2")}>
                &larr;
              </button>

              <button 
              className='btn text-light bg-default fw-bold px-5 py-3 fs-4' 
              onClick={() => navigate("/login", {replace: true})}>
                Get Started
              </button>
            </div>
        </div>
    </>
  )
}

export default Page3