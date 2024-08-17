import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

const GameLogsPage = () => {
  const { lan } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("today");
  const tabs = [
    { name: "Today", name_mm: "ဒီနေ့", value: "today" },
    { name: "Yesterday",name_mm: "မနေ့က", value: "yesterday" },
    { name: "This Week",name_mm: "ဒီအပတ်", value: "this_week" },
    { name: "Last Week",name_mm: "အရင်အပတ်", value: "last_week" },
  ];

  const {data: logs, loading} = useFetch(BASE_URL + "/wager-logs?type=" + selectedTab);
  // console.log(logs);
  
  return (
    <div className="container py-4 pb-5">
      <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <LuClipboardList size={30} color="#DFA041" />
        <h4 className="mt-2 title-text py-2">{ lan === "en" ? "Game Logs" : "ဂိိမ်းမှတ်တမ်း" }</h4>
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
              <th>{lan === "en" ? "From" : "မှ"}</th>
              <th>{lan === "en" ? "To" : "အထိ"}</th>
              <th>{lan === "en" ? "Product" : "ဂိမ်းအုပ်စု"}</th>
              <th>{lan === "en" ? "Bet Amount" : "လောင်းကြေး"}</th>
              <th>{lan === "en" ? "Count" : "အကြိမ်ရေ"}</th>
              <th>{lan === "en" ? "Total Amount" : "စုစုပေါင်းကြေး"}</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
               <td colSpan="6" className="text-center">{lan === "en" ? "Loading..." : "Loading ..."}</td>
             </tr>
            )}
            {logs.length && !loading ? logs.map((log, index) => (
              <tr key={index}>
                <td>{new Date(log.from_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                <td>{new Date(log.to_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                <td>{log.product}</td>
                <td>{Number(log.total_bet_amount).toLocaleString()}</td>
                <td>{log.total_count}</td>
                <td>{log.total_transaction_amount.toLocaleString()}</td>
              </tr>
            )): (
              !loading && (
                <tr>
                  <td colSpan="6" className="text-center">{lan === "en" ? "No Data Found" : "မှတ်တမ်းမရှိသေးပါ။"}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GameLogsPage;
