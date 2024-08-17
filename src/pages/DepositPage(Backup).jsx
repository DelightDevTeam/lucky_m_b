import React, { useContext, useEffect, useState } from "react";
import { FaRegAddressCard, FaRegCheckCircle, FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure to import the CSS for Toastify
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import { FaRegCircleXmark } from "react-icons/fa6";

const DepositPage = () => {
  const { data: banks } = useFetch(BASE_URL + "/agent-payment-type");
  const { data: newLogs } = useFetch(BASE_URL + "/transaction/deposit-log");
  const [logs, setLogs] = useState(newLogs);
  const { lan } = useContext(AuthContext);

  const initialBank = banks?.[0];
  const [bank, setBank] = useState(initialBank);
  const [bankId, setBankId] = useState("");
  const [amount, setAmount] = useState("");
  const [refNo, setRefNo] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const updateBank = (bId) => {
    const selectedBank = banks?.find((b) => String(b?.id) === String(bId));
    setBank(selectedBank);
  };
  

  useEffect(() => {
    if (!bank) {
      setBank(initialBank);
    }
  }, [bank, initialBank]);

  // Optional: If bId changes outside this component, add it to the dependencies.
  useEffect(() => {
    if (bank && bankId) {
      updateBank(bankId);
    }
  }, [bankId, banks]);

  useEffect(() => {
    if (bankId) {
      updateBank(bankId);
    }
  }, [bankId, banks]);

  const handleCopyText = () => {
    if (bank?.account_no) {
      navigator.clipboard.writeText(bank.account_no);
      toast.success("Copied", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };
//   console.log(bank?.id);

  const deposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if (!bankId) {
    //     setBankId(bank?.id);
    //     setLoading(false);
    //     toast.error("ကျေးဇူးပြုပါ ဘဏ်ကိုရွေးပေးပါ")
    //     return;
    // }
    if (amount < 1000) {
      setLoading(false);
      toast.error("အနည်းဆုံး ၁၀၀၀ကျပ်မှ စဖြည့်ပေးပါရန်။", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }
    const inputData = {
      agent_payment_id: bankId ? bankId : String(bank?.id),
      amount,
    };
    // console.log(inputData);
    // return;

    try {
      const response = await fetch(BASE_URL + "/transaction/deposit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          throw new Error("Deposit Failed");
        }

        throw new Error("Deposit Failed");
      }

      const data = await response.json();
      // setLogs([...logs, data.data]);
      setLoading(false);
      setBankId("");
      setAmount("");
      setRefNo("");
      setNote("");

      toast.success("ငွေသွင်းလွှာ ပို့ပြီးပါပြီ။", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      console.error("Error during fetch:", error);
      setLoading(false);
    }
  };
  const { data: newLog1 } = useFetch(BASE_URL + "/transaction/deposit-log");
  useEffect(() => {
    setLogs(newLog1);
    // console.log(logs);
  }, [deposit, newLog1]);

  return (
    <div className="px-2 px-sm-3 pt-4 pb-5 mb-5">
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <FaRegAddressCard size={30} color="#DFA041" />
        <h4 className="mt-2 title-text">
          {lan === "en" ? "Deposit" : "ငွေသွင်း"}
        </h4>
      </div>
      {bank && (
        <div className="border border-light bg-transparent rounded-4 p-2 my-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <div>
                <img
                  className="rounded-3 shadow"
                  src={bank.payment_type.image_url}
                  width={50}
                  alt=""
                />
              </div>
              <div className="ms-2">
                <h6 className="fw-bold text-white">{bank.account_name}</h6>
                <h6 className="fw-bold text-white">{bank.account_no}</h6>
              </div>
            </div>
            <div>
              <button className="btn text-white" onClick={handleCopyText}>
                <FaRegCopy size={25} />
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={deposit}>
        <div className="my-3">
          <div className="row mb-2">
            <div className="text-white col-sm-3">
              {lan === "en" ? "Choose Bank Account" : "ဘဏ်အကောင့် ရွေးပါ။"}
            </div>
            <div className="col-sm-9">
              <select
                className="form-control w-full form-select"
                onChange={(e) => setBankId(e.target.value)}
              >
                {/* <option value="">Select Bank</option> */}
                {banks &&
                  banks.map((bank, index) => (
                    <option key={index} value={bank.id}>
                      {bank.payment_type.name}
                    </option>
                  ))}
              </select>
              {error.agent_payment_id && (
                <small>{error.agent_payment_id}</small>
              )}
            </div>
          </div>
          <div className="row mb-2">
            <div className="text-white col-sm-3">
              {lan === "en" ? "Amount" : "ပမာဏ"}
            </div>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control w-full"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
              {error.amount && <small>{error.amount}</small>}
            </div>
          </div>
          {/* <div className="row mb-2">
                        <div className="text-white col-sm-3">
                        {lan === "en" ? "Transaction Number​ (last 6 digits)" : "ငွေလွှဲနံပါတ် (နောက်ဆုံးဂဏန်း ၆လုံး)"}
                        </div>
                        <div className="col-sm-9">
                            <input type='text' 
                            className="form-control w-full" 
                            onChange={(e) => setRefNo(e.target.value)}
                            value={refNo}
                            />
                            {error.refrence_no && <small>{error.refrence_no}</small>}
                        </div>
                    </div> */}
          {/* <div className="row mb-2">
                        <div className="text-white col-sm-3">
                        {lan === "en" ? "Note" : "မှတ်စု"}
                        </div>
                        <div className="col-sm-9">
                            <textarea className="form-control w-full"
                            onChange={(e) => setNote(e.target.value)}
                            value={note}
                            ></textarea>
                        </div>
                    </div> */}
        </div>
        <button
          className="mt-4 w-max loginBtn py-2 px-5 mx-auto text-white rounded-5 text-center w-100"
          type="submit"
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <h5 className="mx-sm-3">
              {lan === "en" ? "Submit" : "တင်ပို့သည်။"}
            </h5>
          )}
        </button>
      </form>

      <div className="mt-5 mb-5">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-rotate"></i>
          </button>
        </div>

        {logs &&
          logs.map((item, index) => (
            <div
              key={index}
              style={{ width: "100%" }}
              className="d-flex align-items-center gap-2"
            >
              {/* <i className={`fa-regular fa-${item.status === "Pending" ? "loading" : item.status === "Success" ? "circle-check" : "circle-xmark"}`}></i> */}
              {/* <FaReg className={`me-2 ${item.status === "Pending" ? "text-warning" : item.status === "Success" ? "text-success" : "text-danger"}`} size={40} /> */}
              <div
                className="row border-bottom pb-3 mb-3 align-items-center"
                style={{ width: "100%" }}
              >
                <div className="col-8 px-2 px-sm-4">
                  <h5 className="fw-semibold text-white">
                    {item.payment_type}
                  </h5>
                  <small className="d-block mb-1 text-light">
                    {item.datetime}
                  </small>
                  <p
                    className={`badge text-bg-${
                      item.status === "Pending"
                        ? "warning"
                        : item.status === "Success"
                        ? "success"
                        : "danger"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
                <div className="col-4">
                  <h4 className="text-white fw-semibold">
                    {Number(item.amount).toLocaleString()}
                  </h4>
                  {/* <small className="text-secondary d-block">Bonus +฿ 0</small> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DepositPage;
