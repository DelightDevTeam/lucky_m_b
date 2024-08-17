import React from 'react'
import { AiFillSound } from 'react-icons/ai'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'

const Marquee = () => {
  const {data: bannerText} = useFetch(BASE_URL + '/bannerText');

  return (
    <div style={{background:'#99005C'}} className="py-1 px-2  d-flex text-white align-items-center gap-2 text-center">
        <AiFillSound size={25} />
        <marquee  direction="left">
        {bannerText?.text}
    </marquee>
    </div>
  )
}

export default Marquee
