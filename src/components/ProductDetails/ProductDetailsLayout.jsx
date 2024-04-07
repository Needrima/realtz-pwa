import React, { useContext, useState } from 'react'
import Carousel from 'react-multi-carousel';
import './ProductsDetailsLayout.scss'
import Video from './Video';
import locationBlack from '../../assets/icons/location-black.svg'
import ownerImg from '../../assets/images/casual.jpg'
import { productDetailsContext } from '../../pages/ProductDetails/ProductDetails';
import CustomSpin from '../UI/CustomSpin/CustomSpin';
import { useNavigate } from 'react-router-dom';

const ProductDetailsLayout = () => {
  const {product, loading, owner, loadingOwner} = useContext(productDetailsContext);
  const navigate = useNavigate();

  const [fullDesc, showFullDesc] = useState(false);

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
      {loading ? 
        <div className='text-primary fw-bold vh-100 d-flex align-items-center justify-content-center'>
          <span className='me-2'>Loading</span> <CustomSpin spinning={loading} />
        </div>
        : 
        <>
          <Carousel 
              responsive={responsive}
              showDots={true}
              arrows={false}
              // beforeChange={() => {}}
          >
            {product.videos && product.videos.length !== 0 && product.videos.map((video, index) => <Video key={index} video={video}  />)}
          </Carousel>

          <div>
            <div className='fs-3 fw-bold mt-3 text-capitalize'>{product.title.toLowerCase()}</div>

            <div className='d-flex align-items-center text-capitalize'><img src={locationBlack} alt="" className='me-2' /> <span>{product.location.toLowerCase()}</span></div>

            {product.for_rent && 
              <div className='mt-4'>
                <div>Rent (annually)</div>

                <div className='fs-1 text-primary fw-bold'>&#8358; {product.annual_rent}</div>
                <div>
                  Agreement: <span className='text-primary fw-bold'>&#8358; {product.agreement}</span> {" "}
                  Commission:  <span className='text-primary fw-bold'>&#8358; {product.commission}</span> {' '}
                  Caution Fee: <span className='text-primary fw-bold'>&#8358; {product.rent_caution_fee}</span>
                </div>
              </div>
            }

            {product.for_shortlet && 
              <div className='mt-4'>
                <div>Shortlet (nightly)</div>

                <div className='fs-1 text-primary fw-bold'>&#8358; {product.short_let_amount}</div>
                <div>
                  Caution Fee: <span className='text-primary fw-bold'>&#8358; {product.shortlet_caution_fee}</span>
                </div>
              </div>
            }

            <div className='mt-3 d-flex justify-content-around'>
              {product.for_rent && <button className='btn btn-primary fw-bold btn-lg' disabled={product.is_on_rent || product.is_on_shortlet}>{product.is_on_rent ? 'On rent' : 'Rent'}</button>}
              {product.for_shortlet && <button className='btn btn-primary fw-bold btn-lg' disabled={product.is_on_rent || product.is_on_shortlet}>{product.is_on_shortlet ? 'On Shortlet' :  'Shortlet'}</button>}
              <button className='btn btn-outline-primary fw-bold btn-lg' disabled={product.is_on_rent || product.is_on_shortlet}>Inspect</button>
            </div>

            <div className='mt-4 owner-img-section p-3 rounded -3 d-flex align-items-center' onClick={() => navigate(`/profile/${product.user_reference}`)}>
              {loadingOwner ? 
             <div className='text-center w-100'> <CustomSpin spinning={loadingOwner} /> </div>
              :
              <>
                <img src={owner.image} alt="" className='rounded-circle me-2' width={45} height={45}/>
                <div>
                  <div className='fw-bold'>{owner.fullname}</div>
                  <div className='owner-prof'>Agent</div>
                </div>
              </>
              }
            </div>

            <div className='mt-4'>
              <div className='fs-3 fw-bold text-primary'>Description</div>
              <div className={`description ${fullDesc && 'full-description'}`}>
                {product.description} <span className='text-primary fw-bold'>{product.hash_tags && product.hash_tags.map(hashTag => hashTag.startsWith('#') ? hashTag : '#'+hashTag).join(' ')}</span>
              </div> 
              <span className='fw-bold text-primary' onClick={() => showFullDesc(shown => !shown)}>{fullDesc ? 'show less' : 'show more'}</span>
            </div>

            <div className="mt-4">
              <div className='fs-3 fw-bold text-primary'>Features</div>

              <div className='d-flex flex-wrap justify-content-start mt-3'>
                {product.properties.map((property, index) => 
                  <div key={index} className='text-center border border-primary bg-primary text-white py-3 px-2 mb-3 me-3 rounded fw-bold text-capitalize'>
                    {property.toLowerCase()}
                  </div>
                )}
                {/* <div key={index} className='text-center border border-primary bg-primary text-white py-3 px-2 mb-3 me-3 rounded fw-bold text-capitalize'>
                    Bedroom
                </div> */}
            </div>
            </div>

            <div className="mt-4">
              <div className='fs-3 fw-bold text-primary'>Facilities</div>

              <div className='d-flex flex-wrap justify-content-start mt-3'>
                {product.facilities.map((facility, index) => 
                  <div key={index} className='text-center border border-primary bg-primary text-white py-3 px-2 mb-3 me-3 rounded fw-bold text-capitalize'>
                    {facility.toLowerCase()}
                  </div>
                )}
                {/* <div key={index} className='text-center border border-primary bg-primary text-white py-3 px-2 mb-3 me-3 rounded fw-bold text-capitalize'>
                    Bedroom
                </div> */}
            </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default ProductDetailsLayout