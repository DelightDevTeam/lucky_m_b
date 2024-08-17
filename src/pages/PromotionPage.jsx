import React from "react";
import { FaGift } from "react-icons/fa";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

const PromotionPage = () => {
  const { data: promotions } = useFetch(BASE_URL + "/promotion");
  return (
    <div className="pt-4 pb-5 mb-5 px-2 px-sm-3 px-lg-5 text-white">
      <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <FaGift size={30} color="#DFA041" />
        <h4 className="mt-2 title-text">Promotion</h4>
      </div>
      {promotions && promotions.map((item, index) => {
        return (
          <div key={index} className="mb-4">
            <div className="text-center mb-4">
              <img src={item.img_url} className="mx-auto img-fluid rounded-4" />
            </div>
            {/* <p className="mt-2 px-2 px-sm-4">{item.title}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default PromotionPage;
