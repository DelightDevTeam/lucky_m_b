import React, { useContext, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import BASE_URL from '../hooks/baseURL'
import { Spinner } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

const ChangePasswordPage = () => {
    const { lan } = useContext(AuthContext)
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const changePassword = async (e) => {
        e.preventDefault();
        setLoading(true)
        const inputData = {
            "current_password": currentPassword,
            "password": password,
            "password_confirmation": confirmPassword
        }
        // console.log(inputData);
        try {
            const response = await fetch(BASE_URL + '/changePassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(inputData)
            });
    
            if (!response.ok) {
                setLoading(false)
            let errorData = await response.json().catch(() => ({}));
        
            if (response.status === 422) {
                setErrMsg("");
                setError(errorData.errors || "Unknown error");
                
            } else if (response.status === 401) {
                setError("");
                setErrMsg(errorData.message || "Unauthorized");
            } else {
                throw new Error('Change Password Failed');
            }
        
            throw new Error('Change Password Failed');
            }
    
            const data = await response.json();
            setCurrentPassword('');
            setPassword('');
            setConfirmPassword('');
            setLoading(false);
        
            toast.success("New Password changed successfully.", {
            position: "top-right",
            autoClose: 1000,
            theme: 'dark',
            hideProgressBar: false,
            closeOnClick: true
            });
            setIsPwModalOpen(false);
        } catch (error) {
            // console.error('Error during fetch:', error);
            setLoading(false);
        }
    }

  return (
    <div className='p-2 p-sm-4 text-white'>
        <ToastContainer />
            <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <FaUser size={30} color='#DFA041' />
        <h4 className='mt-2 title-text'>{lan === "en" ? "Change Password" : "လျှို့ဝှက်နံပါတ်ချိန်းရန်"}</h4>
        </div>
        <div className="customFormContainer p-3 rounded-4 ">
            <form onSubmit={changePassword}>
                <div className="row mb-2">
                    <div className="  col-sm-3">
                    {lan === "en" ? "Old Password" : "လျှို့ဝှက်နံပါတ်အဟောင်းထည့်ပါ"} :
                    </div>
                    <div className="  col-sm-9 ">
                        <input 
                        type="password" 
                        className="form-control w-full"
                        onChange={e => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        />
                        {error.current_password && <small className='text-light'>{error.current_password}</small>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="  col-sm-3">
                    {lan === "en" ? "New Password" : "လျှို့ဝှက်နံပါတ်အသစ်ထည့်ပါ"} :
                    </div>
                    <div className="  col-sm-9 ">
                        <input 
                        type="password" 
                        className="form-control w-full" 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        />
                        {error.password && <small className='text-light'>{error.password}</small>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="  col-sm-3">
                    {lan === "en" ? "Confirm Password" : "လျှို့ဝှက်နံပါတ်အသစ်အတည်ပြုပါ"} :
                    </div>
                    <div className="  col-sm-9 ">
                        <input 
                        type="password" 
                        className="form-control w-full" 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        />
                        {error.password_confirmation && <small className='text-light'>{error.password_confirmation}</small>}
                    </div>
                </div>
                <button type='submit' className="mt-4 w-max loginBtn py-2 px-5 mx-auto text-white rounded-5 text-center">
                    {loading && <Spinner className='me-2' size='sm' />}
                    <small className='mx-sm-3'>{lan === "en" ? "Change" : "ပြောင်းလဲသည်"}</small>
                </button>
            </form>
        </div>
    </div>
  )
}

export default ChangePasswordPage
