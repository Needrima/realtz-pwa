import React from 'react'
import Video from './Video'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Product = () => {
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
    <>
        <Carousel 
            responsive={responsive}
            showDots={true}
            arrows={false}
            infinite={true}
            beforeChange={() => {
                // console.log(document.getElementsByTagName('video'))
            }}
        >
            <Video id={"p1-v1"} />
            <Video id={"p1-v2"} />
            <Video id={"p1-v3"} />
        </Carousel>;
        {/* <Video />
        <Video />
        <Video /> */}
    </>
  )
}

export default Product