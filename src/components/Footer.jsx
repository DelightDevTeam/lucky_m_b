import React, { useContext } from 'react'
import '../assets/css/footer.css'
import deposit from '../assets/images/deposit.png'
import withdraw from '../assets/images/withdraw.png'
import home from '../assets/images/home.png'
import contact from '../assets/images/contact.png'
import promotion from '../assets/images/promotion.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
 
const Footer = () => {
  const { lan } = useContext(AuthContext);
  const {data: agent} = useFetch(BASE_URL + "/agent");
  const footer=[
    {name:'Deposit', name_mm: "ငွေသွင်း",img:deposit,link:'/deposit'},
    {name:'Withdraw', name_mm: "ငွေထုတ်",img:withdraw,link:'/with-draw'},
    {name:'Home', name_mm: "ပင်မ",img:home,link:'/'},
    {name:'Promotion', name_mm: "ပရိုမိုးရှင်း",img:promotion,link:'/promotion'},
    {name:'Contact ', name_mm: "ဆက်သွယ်ရန်",img:contact,link:agent?.line_id},
  ]
  return (
    <div className='footer d-flex justify-content-between py-2 px-2'>
      {footer.map((item,index)=>{
        return <Link to={item.link} key={index} className={`text-center `}>
          <img src={item.img} className='hoverGroup'   />
          <p className='footerText' style={{textWrap:'nowrap'}} >{lan == "en" ? item.name : item.name_mm}</p>
        </Link>
      })}
    </div>
  )
}

export default Footer
