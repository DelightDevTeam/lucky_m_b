import React, { useContext, useState } from "react";
import casino from "../assets/images/casino.png";
import slot from "../assets/images/slot.png";
import sport from "../assets/images/sport.png";
import fish from "../assets/images/fish.png";
import card from "../assets/images/fire.gif";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { AuthContext } from "../contexts/AuthContext";

const GameTabs = () => {
  const { lan } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [selectedTab, setSelectedTab] = useState("card");
  const tabs = [
    { img: card, value: "card", name: "Hot Games", name_mm: "ဟော့ဂိမ်းများ" },
    { img: casino, value: "casino", name: "Casinos", name_mm: "ကာဆီနို" },
    { img: slot, value: "slot", name: "Slots", name_mm: "စလော့" },
    { img: sport, value: "sport", name: "Sports", name_mm: "အားကစား" },
    { img: fish, value: "fish", name: "Fishings", name_mm: "ငါးပစ်ဂိမ်း" },
  ];

  const { data: casinoGames } = useFetch(BASE_URL + "/gameTypeProducts/2");
  const casinoLobby = casinoGames?.game_lobby?.products;
  const casinoType = casinoGames?.game_type?.products;
  const casinoGameType = casinoGames?.game_lobby?.code ?? casinoGames?.game_type?.code;

  const { data: slotGames } = useFetch(BASE_URL + "/gameTypeProducts/1");
  const slotLobby = slotGames?.game_lobby?.products;
  const slotType = slotGames?.game_type?.products;
  const slotGameType = slotGames?.game_lobby?.code ?? slotGames?.game_type?.code;

  const { data: sportGames } = useFetch(BASE_URL + "/gameTypeProducts/3");
  const sportLobby = sportGames?.game_lobby?.products;
  const sportType = sportGames?.game_type?.products;
  const sportGameType = sportGames?.game_lobby?.code ?? sportGames?.game_type?.code;

  const { data: fishGames } = useFetch(BASE_URL + "/gameTypeProducts/4");
  const fishLobby = fishGames?.game_lobby?.products;
  const fishType = fishGames?.game_type?.products;
  const fishGameType = fishGames?.game_lobby?.code ?? fishGames?.game_type?.code;
  // console.log(fishGameType);

  const { data: hotGames } = useFetch(BASE_URL + "/hotgamelist");

  const launchLobby = (t_code, p_code) => (e) => {
    e.preventDefault();
    let gameData = {
      productId: p_code,
      gameType: t_code,
    };
    fetch(BASE_URL + "/direct/Seamless/LaunchGame", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Launch Game failed");
        }
        console.log("Launch Game success");
        return response.json();
      })
      .then((data) => {
        window.location.href = data.Url;
      })
      .catch((error) => {
        console.error("Launch Game error:", error);
      });
  };

  const launchGame = (t_code, p_code, g_code) => (e) => {
    e.preventDefault();
    let gameData = {
      productId: p_code,
      gameType: t_code === 4 ? 8 : t_code,
      gameId: g_code,
    };

      fetch(BASE_URL + "/game/Seamless/LaunchGame", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(gameData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Launch Game failed");
          }
          console.log("Launch Game success");
          return response.json();
        })
        .then((data) => {
          window.location.href = data.Url;
        })
        .catch((error) => {
          console.error("Launch Game error:", error);
        });
  };

  return (
    <div>
      <div className="gameTabs px-2 px-sm-3 py-2 d-flex align-items-center justify-content-between  text-white ">
        {tabs.map((tab, index) => {
          return (
            <div
              onClick={() => setSelectedTab(tab.value)}
              className={`cursor-pointer text-center  rounded-4 py-2 px-2 gameTab ${
                selectedTab === tab.value ? "gameTabActive" : ""
              } `}
              key={index}
            >
              <img
                src={tab.img}
                className={`gameTabImg ${
                  selectedTab === tab.value && "gameTabActive"
                } mb-3`}
              />
              <p
                className="text-center"
                style={{ marginTop: "-10px", textWrap: "nowrap" }}
              >
                {lan == "en" ? tab.name : tab.name_mm}
              </p>
            </div>
          );
        })}
      </div>
      <div className="p-3 ">
        {selectedTab === "casino" && (
          <div className="row mb-5">
            {casinoType &&
              casinoType.map((item, index) => (
                <Link to={'/games/' + casinoGameType + '/' + item.pivot.product_id} className="col-4 col-sm-3 mb-4" key={index}>
                  <img
                    src={item.imgUrl}
                    className="img-fluid rounded-4 shadow border border-2 border-danger"
                    alt=""
                  />
                  <p className="text-white mb-2">{item.name}</p>
                </Link>
              ))}
            {casinoLobby &&
              casinoLobby.map((item, index) => (
                <Link onClick={launchLobby(casinoGameType, item.code)} className="col-4 col-sm-3 mb-4" key={index}>
                  <img
                    src={item.imgUrl}
                    className="img-fluid rounded-4 shadow border border-2 border-danger"
                    alt=""
                  />
                  <p className="text-white mt-2">{item.name}</p>
                </Link>
              ))}
          </div>
        )}
        {selectedTab === "slot" && (
          <div className="row mb-5 pb-5">
          {slotType &&
            slotType.map((item, index) => (
              <Link to={'/games/' + slotGameType + '/' + item.pivot.product_id} className="col-4 col-sm-3 mb-4" key={index}>
                <img
                  src={item.imgUrl}
                  className="img-fluid rounded-4 shadow border border-2 border-danger"
                  alt=""
                />
                <p className="text-white mb-2">{item.name}</p>
              </Link>
            ))}
          {slotLobby &&
              slotLobby.map((item, index) => (
                <Link onClick={launchLobby(slotGameType, item.code)} className="col-4 col-sm-3 mb-4" key={index}>
                  <img
                    src={item.imgUrl}
                    className="img-fluid rounded-4 shadow border border-2 border-danger"
                    alt=""
                  />
                  <p className="text-white mt-2">{item.name}</p>
                </Link>
              ))}
          </div>
        )}
        {selectedTab === "sport" && (
          <div className="row mb-5 pb-5">
          {sportType &&
            sportType.map((item, index) => (
              <Link to={'/games/' + sportGameType + '/' + item.pivot.product_id} className="col-4 col-sm-3 mb-4" key={index}>
                <img
                  src={item.imgUrl}
                  className="img-fluid rounded-4 shadow border border-2 border-danger"
                  alt=""
                />
                <p className="text-white mb-2">{item.name}</p>
              </Link>
            ))}
          {sportLobby &&
              sportLobby.map((item, index) => (
                <Link onClick={launchLobby(sportGameType, item.code)} className="col-4 col-sm-3 mb-4" key={index}>
                  <img
                    src={item.imgUrl}
                    className="img-fluid rounded-4 shadow border border-2 border-danger"
                    alt=""
                  />
                  <p className="text-white mt-2">{item.name}</p>
                </Link>
              ))}
          </div>
        )}
        {selectedTab === "fish" && (
          <div className="row mb-5 pb-5">
          {fishType &&
            fishType.map((item, index) => (
              <Link to={'/games/' + fishGameType + '/' + item.pivot.product_id} className="col-4 col-sm-3 mb-4" key={index}>
                <img
                  src={item.imgUrl}
                  className="img-fluid rounded-4 shadow border border-2 border-danger"
                  alt=""
                />
                <p className="text-white mb-2">{item.name}</p>
              </Link>
            ))}
          {fishLobby &&
              fishLobby.map((item, index) => (
                <Link onClick={launchLobby(fishGameType, item.code)} className="col-4 col-sm-3 mb-4" key={index}>
                  <img
                    src={item.imgUrl}
                    className="img-fluid rounded-4 shadow border border-2 border-danger"
                    alt=""
                  />
                  <p className="text-white mt-2">{item.name}</p>
                </Link>
              ))}
          </div>
        )}
        {selectedTab === "card" && (
          <div className="row mb-5 pb-5">
          {hotGames &&
            hotGames.map((game, index) => (
              <Link onClick={launchGame(game.game_type_id, game.product_code, game.code)} className="col-md-2 col-4 mb-4 px-1" key={index}>
                  <img src={game.image_url} className='img-fluid rounded-4 shadow' alt="" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTabs;
