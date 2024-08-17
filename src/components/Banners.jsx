import React from 'react'
import { Carousel } from 'react-bootstrap'
import '../assets/css/home.css'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'

const Banners = () => {
  const {data:banners} = useFetch(BASE_URL + '/banner');

  return (
        <Carousel>
            {banners && banners.map((banner,index)=>{
                return  <Carousel.Item key={index}>
                <img className='banner' src={banner.img_url} />
              </Carousel.Item>
            })}
      
      </Carousel>
   )
}

export default Banners
