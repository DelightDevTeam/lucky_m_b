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
  const { data: newLogs } = useFetch(BASE_URL + "/transaction/deposit-log");
  const { data: agent } = useFetch(BASE_URL + "/agent");
  const { data: banks } = useFetch(BASE_URL + "/payment-type");
  const { lan } = useContext(AuthContext);
  
  
  const bank = banks?.find((b) => String(b?.id) === String(agent?.payment_type_id));
  const [logs, setLogs] = useState(newLogs);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCopyText = () => {
    if (agent?.account_number) {
      navigator.clipboard.writeText(agent?.account_number);
      toast.success("Copied", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const deposit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const inputData = {
      agent_payment_type_id: String(agent?.payment_type_id),
      amount,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/transaction/deposit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(inputData),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
  
        switch (response.status) {
          case 422:
            setError(errorData.errors || "Validation error");
            break;
          case 401:
            setErrMsg(errorData.message || "Unauthorized access");
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
        throw new Error("Deposit failed");
      }
  
      const data = await response.json();
      setAmount("");
      toast.success("ငွေသွင်းလွှာ ပို့ပြီးပါပြီ။", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
  
    } catch (error) {
      console.error("Error during deposit:", error);
      // Optionally set a general error state here
      // setError("Deposit failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setLogs(newLogs);
  }, [newLogs]);

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
        <div className="border border-light bg-transparent rounded-4 p-2 px-3 my-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <div>
                <img
                  className="rounded-3 shadow"
                  src={bank.image_url}
                  width={100}
                  alt=""
                />
              </div>
              <div className="ms-2">
                <h6 className="fw-bold text-white">{bank.name}</h6>
                <h6 className="fw-bold text-white">{agent?.account_name}</h6>
                <h6 className="fw-bold text-white">{agent?.account_number}</h6>
              </div>
            </div>
            <div>
              <button className="btn btn-warning" onClick={handleCopyText}>
                <FaRegCopy size={25} />
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={deposit}>
        <div className="my-3">
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
              {error.amount && <small className="text-danger">{error.amount}</small>}
            </div>
          </div>
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
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DepositPage;
