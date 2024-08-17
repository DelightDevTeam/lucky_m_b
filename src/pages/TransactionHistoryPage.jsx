import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { AuthContext } from "../contexts/AuthContext";

const TransactionHistoryPage = () => {
  const { lan } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("today");
  const tabs = [
    { name: "Today", name_mm: "ဒီနေ့", value: "today" },
    { name: "Yesterday",name_mm: "မနေ့က", value: "yesterday" },
    { name: "This Week",name_mm: "ဒီအပတ်", value: "this_week" },
    { name: "Last Week",name_mm: "အရင်အပတ်", value: "last_week" },
  ];
  const {data: logs, loading} = useFetch(BASE_URL + "/transactions?type=" + selectedTab);
  console.log(logs);



  return (
    <div className="py-4 mb-5">
      <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <FaMoneyBillTransfer size={30} color="#DFA041" />
        
        <h4 className="mt-2 title-text py-2">{ lan === "en" ? "Game Transactions" : "ဂိိမ်းကစားမှတ်တမ်း" }</h4>
      </div>

      <div className="d-flex align-items-center flex-wrap gap-1 gap-sm-3 text-white mb-3">
      {tabs.map((tab, index) => {
          return (
            <div
              key={index}
              onClick={() => setSelectedTab(tab.value)}
              className={`  py-2 px-2 ${
                selectedTab === tab.value ? "activeBg" : ""
              }`}
            >
              <p className="px-1 px-sm-3 filterTime">{ lan === "en" ? tab.name : tab.name_mm}</p>
            </div>
          );
        })}
      </div>
      <div className="tableContainer">
        <Table className="mb-5" striped bordered hover>
          <thead>
            <tr>
              <th>{lan === "en" ? "Type" : "အမျိုးအစား"}</th>
              <th>{lan === "en" ? "Amount" : "ပမာဏ"}</th>
              <th>{lan === "en" ? "Closing Balance" : "လက်ကျန်ငွေ"}</th>
              <th>{lan === "en" ? "DateTime" : "အချိန်"}</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
                <tr>
                <td colSpan="4" className="text-center">{lan === "en" ? "Loading..." : "Loading ..."}</td>
              </tr>
              )}
              {logs.length && !loading ? logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.type}</td>
                  <td>{log.amount}</td>
                  <td>{log.closing_balance}</td>
                  <td>{log.datetime}</td>
                </tr>
              )): (
                !loading && (
                  <tr>
                    <td colSpan="4" className="text-center">{lan === "en" ? "No Data Found" : "မှတ်တမ်းမရှိသေးပါ။"}</td>
                  </tr>
                )
              )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
