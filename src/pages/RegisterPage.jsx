import React, { useState } from 'react'
import '../assets/css/login.css'
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import BASE_URL from '../hooks/baseURL';
import useFetch from '../hooks/useFetch';


const RegisterPage = () => {
  const {data: banks} = useFetch(BASE_URL + '/payment-type');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [refNo, setRefNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(banks);
  

  const register = (e) =>{
    e.preventDefault();
    setLoading(true);
    const registerData = {
        name: name,
        phone: phone,
        password: password,
        password_confirmation: confirmPassword,
        referral_code: refNo,
        payment_type_id: paymentType,
        account_name: accountName,
        account_number: accountNumber,
    };

    fetch(BASE_URL + '/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    })
      .then(async response => {
        if (!response.ok) {
          setLoading(false);
          let errorData;
          try {
            errorData = await response.json();
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
    
          if (response.status === 422) {
            setErrMsg("");
            setError(errorData.errors);
          }else if (response.status === 401) {
            setError("");
            setErrMsg(errorData.message)
            // console.log(errorData.message);
          }else{
          }
          throw new Error('Register Failed');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setLoading(false);
        localStorage.setItem('token', data.data.token);
        navigate('/')
      })
      .catch(error => {
      });
  }


  return (
    <div style={{height:'100vh'}} className='loginBg p-2 d-flex align-items-center justify-content-center' >
      <div className="loginContainer px-3 py-5">
        {/* <img src={logo} className='loginLogo' /> */}
        <h5 style={{marginTop:'-10px'}}>Register</h5>
        {errMsg && (
          <small className='alert alert-danger w-100 d-block text-start' role='alert' closeBtn>
            {errMsg}
          </small>
        )}
        <form onSubmit={register}>
            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Name
                </small>
                <input 
                type="text" 
                className="rounded-5 form-control" 
                placeholder='Enter Name'
                onChange={e => setName(e.target.value)}
                value={name}
                />
                {error.name && <small className='text-danger'>{error.name}</small>}
            </div>
            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Phone
                </small>
                <input 
                type="text" 
                className="rounded-5 form-control" 
                placeholder='Enter Phone Number'
                onChange={e => setPhone(e.target.value)}
                value={phone}
                />
                {error.phone && <small className='text-danger'>{error.phone}</small>}
            </div>
            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Password
                </small>
                <input 
                type="password" 
                className="rounded-5 form-control" 
                placeholder='Enter Password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                />
                {error.password && <small className='text-danger'>{error.password}</small>}
            </div>
            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Confirm Password
                </small>
                <input 
                type="password" 
                className="rounded-5 form-control" 
                placeholder='Enter Confirm Password'
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                />
                {error.password_confirmation && <small className='text-danger'>{error.password_confirmation}</small>}
            </div>
            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Referal Code
                </small>
                <input 
                type="text" 
                className="rounded-5 form-control" 
                placeholder='Enter Referal Code'
                onChange={e => setRefNo(e.target.value)}
                value={refNo}
                />
                {error.referral_code && <small className='text-danger'>{error.referral_code}</small>}
            </div>
            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Choose Bank
                </small>
                <select 
                className="form-control form-select rounded-5"
                onChange={e => setPaymentType(e.target.value)}
                value={paymentType}
                >
                  <option value="">Choose Bank</option>
                  {banks && banks.map((bank, index) =>(
                    <option key={index} value={bank.id}>{bank.name}</option>
                  ))}
                </select>
                {error.payment_type_id && <small className='text-danger'>{error.payment_type_id}</small>}
            </div>

            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Account Name
                </small>
                <input 
                type="text" 
                className="rounded-5 form-control" 
                placeholder='Enter Account Name'
                onChange={e => setAccountName(e.target.value)}
                value={accountName}
                />
                {error.account_name && <small className='text-danger'>{error.account_name}</small>}
            </div>
            <div className="mb-3">
                <small className="text-start text-warning d-block fw-semibold mb-1">Account Number
                </small>
                <input 
                type="text" 
                className="rounded-5 form-control" 
                placeholder='Enter Account Number'
                onChange={e => setAccountNumber(e.target.value)}
                value={accountNumber}
                />
                {error.account_number && <small className='text-danger'>{error.account_number}</small>}
            </div>
            <button type='submit' className="rounded-5 py-2 d-block w-full registerBtn w-100">
              {loading && <Spinner size='sm' className='me-2' />}
                <h5 className='d-inline'>Register</h5>
            </button>
        </form>
         <div className="text-center mt-3">
            <p>Already have an account?
              <Link to={'/login'} className="text-decoration-none text-warning fw-semibold ms-2">Login</Link>
            </p>
          </div>
      </div>

    </div>
  )
}

export default RegisterPage
