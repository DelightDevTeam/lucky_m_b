import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/login.css'
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../hooks/baseURL';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';


const LoginPage = () => {
  const [eye, setEye] = useState(false);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = localStorage.getItem('token');
  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth, navigate]);

  const handleEye = () => {
    setEye(!eye);
  }

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    const loginData = {
      "phone": phone,
      "password": password
    }
    fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
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
          }else{
          }
          throw new Error('Login Failed');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('ads', "on");
          navigate('/')
          console.log("success");
        } else {
          throw new Error('Token not found in response');
        }
      })
      .catch(error => {
    });
  }

  return (
    <div style={{height:'100vh'}} className='loginBg p-2 d-flex align-items-center justify-content-center' >
      <div className="loginContainer px-3 pb-5 pt-5">
        {/* <img src={logo} className='loginLogo' /> */}
        <h5 style={{marginTop:'-10px'}}>Login</h5>
        <form onSubmit={login}>
          <div className="mb-3">
              <small className="text-start text-warning d-block fw-semibold mb-1">Phone
              </small>
              <input 
              type="text" 
              className="rounded-5 form-control" 
              placeholder='Enter Phone'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              />
              {error.phone && <small className="text-start text-danger d-block fw-semibold">{error.phone}</small>}
              {errMsg && <small className="text-start text-danger d-block fw-semibold">{errMsg}</small>}
          </div>
          <div className="mb-3 password">
              <small className="text-start text-warning d-block fw-semibold mb-1">Password
              </small>
              <input 
              type={`${eye ? 'text' : 'password'}`} 
              className="rounded-5 form-control" 
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
              <i className={`fas fa-${eye ? 'eye' : 'eye-slash'} eye`} onClick={handleEye}></i>
              {error.password && <small className="text-start text-danger d-block fw-semibold">{error.password}</small>}
          </div>
          <button className="rounded-5 py-2 mt-4  mb-3 d-block w-100 loginBtn" type="submit">
            {loading && <Spinner size='sm' className='me-2' />}
            Login
          </button>
        </form>
        <div className="text-center">
          <p>Are you new player? 
            <Link to={'/register'} className="text-decoration-none text-warning fw-semibold ms-2">Register</Link>
          </p>
        </div>
        {/* <Link to={'/register'} className="rounded-5 py-3 d-block w-full registerBtn">
          Register
        </Link> */}
      </div>
    </div>
  )
}

export default LoginPage
