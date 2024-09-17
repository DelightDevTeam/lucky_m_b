import React, { useContext, useState } from "react";
import "../assets/css/navbar.css";
import { RiMenu2Line } from "react-icons/ri";
import siteLogo from "../assets/images/logo.png";
import money from "../assets/images/money.png";
import en from "../assets/images/en.png";
import mm from "../assets/images/mmpng.png";
import {
  FaGamepad,
  FaGift,
  FaKey,
  FaRegUserCircle,
  FaUser,
  FaUserCog,
} from "react-icons/fa";
import { Button, Dropdown, Offcanvas } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaCircleUser, FaListCheck, FaRightFromBracket } from "react-icons/fa6";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

const Navbar = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user, lan, updateLanguage } = useContext(AuthContext);
  const navigate = useNavigate();
  const {data: agent} = useFetch(BASE_URL + "/agent");
  // console.log(lan);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  }

  const menus = [
    {
      id: 1,
      name: "My Profile",
      name_mm: "ကျွန်ုပ််ပရိုဖိုင်",
      icon: <FaRegUserCircle color="#DB9300" size={20} />,
      link: "/profile",
    },
    // {
    //   id: 4,
    //   name: "Update Profile",
    //   name_mm: "ပရိုဖိုင်ပြင်မည်",
    //   icon: <FaUserCog color="#DB9300" size={30} />,
    //   link: "/update-profile",
    // },
    {
      id: 2,
      name: "Change Password",
      name_mm: "လျှို့ဝှက်နံပါတ်ပြောင်းရန်",
      icon: <FaKey color="#DB9300" size={20} />,
      link: "/change-password",
    },
    {
      id: 3,
      name: "Game Logs",
      name_mm: "ဂိမ်းမှတ်တမ်း",
      icon: <FaGamepad color="#DB9300" size={20} />,
      link: "/game-logs",
    },
    {
      id: 4,
      name: "Game Transaction",
      name_mm: "ဂိမ်းကစားခြင်းမှတ်တမ်း",
      icon: <FaListCheck color="#DB9300" size={20} />,
      link: "/transaction-history",
    },
  ];

  return (
    <div className="navbar py-3">
      <div className="d-flex align-items-center gap-2">
        <RiMenu2Line
          onClick={() => setIsSideMenuOpen(true)}
          className="h-max"
          color={"#fff"}
          size={30}
        />
        <Link to={"/"}>
        {agent.agent_logo && <img src={agent.agent_logo} className="py-0 my-0" width={100} />}
        {!agent.agent_logo && <img src={siteLogo} className="logo" width={50} />}
        </Link>
      </div>
      <div>
        <div className="d-flex align-items-center gap-2">
          <div className="btn btn-sm btn-light rounded-5">
            <img src={money} className="flag" />
            <span className="fw-semibold">
              {user?.balance}
              {/* {Number(user?.balance).toLocaleString()} */}
            </span>
          </div>

          {/* language */}
          <Dropdown>
            <Dropdown.Toggle
              className="border-0"
              style={{ background: "none" }}
              id="dropdown-basic"
            >
              <img src={lan == "en" ? en : mm} className="flag" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => updateLanguage('en')} >
                <img src={en} className="flag"/> EN
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateLanguage('mm')} >
                <img src={mm} className="flag" /> မြန်မာ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* profile */}
        <Dropdown className="mt-2">
          <Dropdown.Toggle
            className="w-100 btn btn-sm btn-outline-light rounded-5"
            style={{ background: "none" }}
            id="dropdown-basic"
          >
            <FaUser className="me-3" color="#DFA041" size={22} />
            <span className="text-white fw-semibold">{user?.user_name}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100">
            <Dropdown.Item>
              <Link to={'/profile'}>
                <FaCircleUser /> {lan == 'en' ? 'Profile' : 'ပရိုဖိုင်'}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link onClick={logout}>
                <FaRightFromBracket /> {lan == 'en' ? 'Logout' : 'အကောင့်ထွက်ရန်'}
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Offcanvas
        className="sideMenu  "
        show={isSideMenuOpen}
        onHide={() => setIsSideMenuOpen(false)}
      >
        <Offcanvas.Header className="py-0 my-0" closeButton>
          <Offcanvas.Title>
            {agent.agent_logo && <img src={agent.agent_logo} className="" width={100} />}
            {!agent.agent_logo && <img src={siteLogo} className="" width={100} />}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {menus.map((menu) => {
            return (
              <div className="mb-4" key={menu.id}>
                <Link
                  to={menu.link}
                  className="d-flex align-items-center gap-2 mb-3"
                >
                  <div>
                  {menu.icon}
                  </div>
                  <div>
                  <small className="fw-semibold mt-2">{lan === "en" ? menu.name : menu.name_mm}</small>
                  </div>
                </Link>
              </div>

            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Navbar;
