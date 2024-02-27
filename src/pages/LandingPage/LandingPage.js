import React from 'react'
import './LandingPage.scss'

const LandingPage = () => {
  if(document.readyState === 'complete'){
    if(document.querySelector('.landing-page')) {
      'notLoggedIn'
    }else {
      'loggedIn'
    }
  }else {
    'unknown'
  }
  return (
    <div className='landing-page'>
        <div className='d-flex justify-content-between align-items-center mb-5'>
            <div className='fw-bold fs-2 text-muted'>Logo</div>
            <button className='btn badge text-light bg-default-dark rounded-4 px-4 py-2 fs-4'>Login</button>
        </div>

        <h1 className='fw-bold mb-4'>Find the best place <br />to live <span className='text-default'>comfortably</span></h1>

        <div className='mb-5 text-muted'>Lorem ipsum dolor sit amet, consectur <br /> adipiscing elit, sed.</div>
        
        <div className='img-background-div rounded-4 d-flex align-items-end justify-content-center pb-5'>
          <button className='btn text-light bg-default fw-bold px-5 py-3 fs-4'>Register</button>
        </div>
    </div>
  )
}

export default LandingPage