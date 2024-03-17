import React, { useState } from 'react'
import Video from './Video'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Product = () => {
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
    <>
        <Carousel 
            responsive={responsive}
            showDots={true}
            arrows={false}
            beforeChange={() => {
                const videos = document.getElementsByTagName('video');
                for (let i = 0; i < videos.length; i++){
                    videos[i].currentTime = 0;
                    videos[i].pause();
                }
            }}
        >
            <Video />
            <Video />
            <Video />
        </Carousel>;
    </>
  )
}

export default Product