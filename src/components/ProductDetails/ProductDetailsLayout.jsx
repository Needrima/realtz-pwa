import React from 'react'
import Carousel from 'react-multi-carousel';
import './ProductsDetailsLayout.scss'
import Video from './Video';
import locationBlack from '../../assets/icons/location-black.svg'
import ownerImg from '../../assets/images/casual.jpg'

const ProductDetailsLayout = () => {
    //carousel responsveness property
  const responsive = {
    // superLargeDesktop: {
    //   // the naming can be any, depends on you.
    //   breakpoint: { max: 4000, min: 3000 },
    //   items: 5
    // },
    // desktop: {
    //   breakpoint: { max: 3000, min: 1024 },
    //   items: 3
    // },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

  return (
    <div className='p-2'>
        <Carousel 
            responsive={responsive}
            showDots={true}
            arrows={false}
            // beforeChange={() => {
            //     const videos = document.getElementsByTagName('video');
            //     for (let i = 0; i < videos.length; i++){
            //         videos[i].currentTime = 0;
            //         videos[i].pause();
            //     }
            // }}
        >
          <Video />
          <Video />
        </Carousel>

        <div>
          <div className='fs-3 fw-bold mt-3'>5 Bedrooms Semi Detached Duplex</div>

          <div className='d-flex align-items-center'><img src={locationBlack} alt="" className='me-2' /> <span>Victoria Island Lagos</span></div>

          <div className='mt-4'>
            <div>Rent/year</div>

            <div className='fs-1 text-primary fw-bold'>&#8358; 8000000</div>
            <div>Agreement: <span className='text-primary fw-bold'>&#8358; 400000</span>, Commission:  <span className='text-primary fw-bold'>&#8358; 400000</span></div>
          </div>

          <div className='mt-3 d-flex justify-content-around'>
            <button className='btn btn-primary fw-bold btn-lg'>Rent</button>
            <button className='btn btn-primary fw-bold btn-lg'>Shortlet</button>
            <button className='btn btn-outline-primary fw-bold btn-lg'>Inspect</button>
          </div>

          <div className='mt-4 owner-img-section p-3 rounded -3 d-flex align-items-center'>
            <img src={ownerImg} alt="" className='rounded-circle me-2'  width={45} height={45}/>
            <div>
              <div className='fw-bold'>Oyebode Amirdeen</div>
              <div className='owner-prof'>Real Estate Company</div>
            </div>
          </div>

          <div className='mt-4'>
            <div className='fs-3 fw-bold text-primary'>Description</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ullam quia ut consequatur natus, voluptas atque itaque modi sapiente facere accusamus soluta, cumque error illum similique placeat temporibus recusandae porro ea inventore maiores, nesciunt quam ab mollitia. Vel explicabo iste molestiae ipsa accusamus? Sit rem voluptas explicabo, magni ex perferendis!</div>
          </div>

          <div className="mt-4">
            <div className='fs-3 fw-bold text-primary'>Features</div>
            <div></div>
          </div>
        </div>
    </div>
  )
}

export default ProductDetailsLayout