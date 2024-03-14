import React from 'react'
import './Page3.scss'
import { useNavigate } from 'react-router-dom'

const Page3 = () => {
  const navigate = useNavigate()
  return (
    <>
        <h1 className='fw-bold mb-4'>Find the best place <br />to live <span className='text-default'>comfortably</span></h1>

        <div className='mb-5 text-muted'>Lorem ipsum dolor sit amet, consectur <br /> adipiscing elit, sed. page 3</div>

        <div className='bg-img-div bg-img rounded-4 d-flex align-items-end justify-content-center pb-5'>
            <button 
            className='btn text-light bg-default fw-bold px-5 py-3 fs-4' 
            onClick={() => navigate("/login", {replace: true})}>
              Proceed
            </button>
        </div>
    </>
  )
}

export default Page3