import React, { useContext } from 'react'
import './Home.scss'
import { HomeContext } from '../../pages/Home/Home'
import Product from './Product'

const HomeLayout = () => {
    const {tab, changeTab} = useContext(HomeContext);
  return (
    <div className='bg-dark'>
        <Product />
        <Product />

        <div className='position-fixed w-100 d-flex justify-content-center' style={{top: '5%'}}>
            <div onClick={() => changeTab('home')} className={`text-light me-3 fw-bold fs-3 ${tab === 'home' ? 'active-tab' : ''} position-relative`}>Home</div>
            <div onClick={() => changeTab('trending')} className={`text-light fw-bold fs-3 ${tab === 'trending' ? 'active-tab' : ''} position-relative`}>Trending</div>
        </div>
    </div>
  )
}

export default HomeLayout