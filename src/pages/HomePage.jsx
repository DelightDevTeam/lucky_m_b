import React, { useContext, useEffect, useState } from 'react'
import Marquee from '../components/Marquee'
import Banners from '../components/Banners'
import GameTabs from '../components/GameTabs'
import { Modal } from 'react-bootstrap'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'

const HomePage = () => {
  const [isAdsOpen,setIsAdsOpen]=useState(false);
  const {data: ads} = useFetch(BASE_URL + '/popup-ads-banner');
  const {data: contact} = useFetch(BASE_URL + '/contact');
  const adsOn = localStorage.getItem('ads');

  useEffect(() => {
    if(adsOn === "on"){
      setIsAdsOpen(true);
    }
  }, [adsOn])

  const adsClose = () => {
    setIsAdsOpen(false);
    localStorage.removeItem('ads');
  }
  // console.log(ads);

  return (
    <div>
      <Marquee/>
      <Banners/>
      <GameTabs/>
      <Modal show={isAdsOpen} onHide={()=>[setIsAdsOpen(false), adsClose]}>
        <Modal.Header className='d-flex justify-content-end'>
          <i className="fas fa-xmark" onClick={adsClose}></i>
        </Modal.Header>
        <Modal.Body>
          <img src={ads?.img_url} className='img-fluid rounded-3' />
          <p className='my-2 fw-semibold text-center'>ငွေသွင်းငွေထုတ်အတွက် အကြောင်းကြားစာ ဆက်သွယ်နိုင်ပါတယ် အခုပဲ လိုင်းစိမ်းကို အပ်လိုက်ပါ Add Line</p>
          <p className="text-center fw-semibold mb-2">
          {contact.name && (
            <small className='d-block'>
              Name : {contact.name}
            </small>
          )}
          {contact.phone && (
            <small className='d-block'>
              Phone : {contact.phone}
            </small>
          )}
          {contact.email && (
            <small>
              Email : {contact.email}
            </small>
          )}
          </p>
        </Modal.Body>
         
      </Modal>
    </div>
  )
}

export default HomePage
