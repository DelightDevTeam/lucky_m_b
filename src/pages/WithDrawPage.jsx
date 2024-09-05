import React, { useContext, useEffect, useState } from 'react'
import { FaRegAddressCard, FaRegCheckCircle } from 'react-icons/fa'
import BASE_URL from "../hooks/baseURL";
import useFetch from '../hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

const WithDrawPage = () => {
    const { user, lan } = useContext(AuthContext);
    const balance = user?.balance;

    const { data: banks } = useFetch(BASE_URL + '/payment-type');
    const bank = banks?.find((b) => String(b?.name) === String(user?.paymentType));

    const { data: newLogs } = useFetch(BASE_URL + '/transaction/withdraw-log');
    const [logs, setLogs] = useState(newLogs);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);


    const withdraw = async (e) => {
        e.preventDefault();
        setLoading(true);
        // if (amount < 1000) {
        //     setLoading(false);
        //     toast.error("အနည်းဆုံး ၁၀၀၀ကျပ်မှ စဖြည့်ပေးပါရန်။", {
        //       position: "top-right",
        //       autoClose: 1000,
        //       theme: "dark",
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //     });
        //     return;
        // }
        if(Number(amount) > balance){
            setLoading(false)
            toast.error("ငွေထုတ်ယူမည့် ပမာဏမှာ လက်ကျန်ငွေ ထပ် ကျော်လွန်နေပါသည်။", {
              position: "top-right",
              autoClose: 3000,
              theme: 'dark',
              hideProgressBar: false,
              closeOnClick: true
            })
            return;
        }

        const inputData = {
            "amount": amount,
        }
    
        try {
            const response = await fetch(BASE_URL + '/transaction/withdraw', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(inputData)
            });
        
            if (!response.ok) {
              let errorData = await response.json().catch(() => ({}));
        
              if (response.status === 422) {
                setErrMsg("");
                setError(errorData.errors || "Unknown error");
              } else if (response.status === 401) {
                setError("");
                setErrMsg(errorData.message || "Unauthorized");
              } else {
                throw new Error('Deposit Failed');
              }
        
              throw new Error('Deposit Failed');
            }
        
            const data = await response.json();
            setLoading(false);
            setAmount("");
        
            toast.success("ငွေထုတ်လွှာ ပို့ပြီးပါပြီ။", {
              position: "top-right",
              autoClose: 1000,
              theme: 'dark',
              hideProgressBar: false,
              closeOnClick: true
            });
        
            setTimeout(() => {
              navigate("/history");
            }, 2000);
          } catch (error) {
            console.error('Error during fetch:', error);
            setLoading(false);
          }
      }


      const { data: newLog1 } = useFetch(BASE_URL + '/transaction/withdraw-log');
      useEffect(() => {
          setLogs(newLog1);
      }, [withdraw, newLog1]);

  return (
    <div className='px-2 px-sm-3 pt-4 pb-5 mb-5'>
        <ToastContainer />
        <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <FaRegAddressCard size={30} color='#DFA041' />
        <h4 className='mt-2 py-2 title-text'>{lan === "en" ? "Withdraw" : "ငွေထုတ်သည်"}</h4>
        </div>

        <div className="border border-light bg-transparent rounded-4 p-2 my-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <div>
                <img
                  className="rounded-3 shadow"
                  src={bank?.image_url}
                  width={100}
                  alt=""
                />
              </div>
              <div className="ms-2">
                <h6 className="fw-bold text-white">{bank?.name}</h6>
                <h6 className="fw-bold text-white">{user?.account_name}</h6>
                <h6 className="fw-bold text-white">{user?.account_number}</h6>
              </div>
            </div>
            <div>
              {/* <button className="btn text-white" onClick={handleCopyText}>
                <FaRegCopy size={25} />
              </button> */}
            </div>
          </div>
        </div>

            <form onSubmit={withdraw}>
                <div className="my-3">
                        <div className="row mb-2">
                            <div className="text-white  col-sm-3">
                            {lan === "en" ? "Amount" : "ပမာဏ"}
                            </div>
                            <div className="  col-sm-9 ">
                                <input 
                                type='number' 
                                className="form-control w-full" 
                                onChange={e => setAmount(e.target.value)}
                                value={amount}
                                />
                                {error.amount && <span className="text-danger">{error.amount}</span>}
                            </div>
                        </div>
                </div>
                <button type='submit' className="w-100 mt-4 w-max loginBtn py-2 px-5 mx-auto text-white rounded-5 text-center">
                    {loading ? <Spinner animation="border" variant="light" size="sm" /> : (
                        <h5 className='mx-sm-3'>{lan === "en" ? "Submit" : "တင်သွင်းမည်"}</h5>
                    )}
                </button>
             </form>
        
        <div className="mt-5 mb-5">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-sm btn-outline-light" onClick={() => window.location.reload()}>
                        <i className="fas fa-rotate"></i>
                    </button>
                </div>
            {logs && logs.map((item,index)=>{
            return <div key={index} style={{ width: '100%' }} className="d-flex align-items-center gap-2">
            {/* <i className={`fa-regular fa-${item.status === "Pending" ? "loading" : item.status === "Success" ? "circle-check" : "circle-xmark"}`}></i> */}
            {/* <FaReg className={`me-2 ${item.status === "Pending" ? "text-warning" : item.status === "Success" ? "text-success" : "text-danger"}`} size={40} /> */}
            <div className='row border-bottom pb-3 mb-3 align-items-center' style={{ width: '100%' }}>
                <div className="col-8 px-2 px-sm-4">
                    <h5 className="fw-semibold text-white">{item.payment_type}</h5>
                    <small className="d-block mb-1 text-light">
                        {item.datetime}</small>
                    <small className="d-block mb-1 text-light">
                    Account Name :{ item.account_name}</small>
                    <small className="d-block mb-1 text-light">
                    Account Number : {item.account_no}</small>
                    <p className={`badge text-bg-${item.status === "Pending" ? "warning" : item.status === "Success" ? "success" : "danger"}`}>{item.status}</p>
                </div>
                <div className="col-4">
                    <h4 className="text-white fw-semibold">{Number(item.amount).toLocaleString()}</h4>
                    {/* <small className="text-secondary d-block">Bonus +฿ 0</small> */}
                </div>
            </div>
        </div>
            })}
        </div>
    </div>
  )
}

export default WithDrawPage
