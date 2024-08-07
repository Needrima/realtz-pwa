import React, { useContext, Fragment } from 'react'
import './Screen2.scss'
import { LandingPageContext } from '../../../pages/LandingPage/LandingPage'

const Screen2 = () => {
  const {changeScreen} = useContext(LandingPageContext);
  return (
    <Fragment key={"screen2"}>
        <h1 className='fw-bold mb-4'>Sell your property quickly <br />with <span className='text-default'>just a click</span></h1>

        <div className='mb-5 text-muted'>Lorem ipsum dolor sit amet, consectur <br /> adipiscing elit, sed.</div>

        <div className='bg-img-div bg-img-2 rounded-4 d-flex flex-column align-items-center justify-content-end pb-5'>

            <div className='d-flex mb-2'>
              <div className="border border-2 border-light me-2 px-3"></div>
              <div className="step-bars-active me-2 px-3"></div>
              <div className="border border-2 border-light px-3"></div>
            </div>

            <div>
              <button 
              className='btn text-light bg-default fw-bold py-3 px-4 fs-4 rounded-circle me-2' 
              onClick={() => changeScreen("1")}>
                &larr;
              </button>

              <button 
              className='btn text-light bg-default fw-bold px-5 py-3 fs-4' 
              onClick={() => changeScreen("3")}>
                Next
              </button>
            </div>
        </div>
    </Fragment>
  )
}

export default Screen2