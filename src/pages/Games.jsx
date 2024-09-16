import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import { Spinner } from 'react-bootstrap';

export default function Games() {
    const { provider, type } = useParams();
    const {data:providers} = useFetch(BASE_URL + '/gameTypeProducts/' + type);
    // console.log(provider, type);

    const providerName = providers?.game_type?.products?.find((p) => p?.id == provider)?.name;

    const {data:games, loading} = useFetch(BASE_URL + '/game/gamelist/' + provider + '/' + type);

    const launchGame = (p_code, g_code) => (e) => {
        e.preventDefault();
        let gameData = {
          productId: p_code,
          gameType: type,
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
            // window.href = data.Url;
          })
          .catch((error) => {
            console.error("Launch Game error:", error);
          });
    };

  return (
    <div className='text-white container'>
        <h3 className="text-center my-4">
            {providerName}
        </h3>
        <div className="row mx-2">
            {loading && (
                <div className='text-center'>
                    <Spinner size='lg' />
                </div>
            )}
            {games.length !== 0 ? games.map((game, index) => (
                <Link onClick={launchGame(game.product_code, game.code)} className="col-md-2 col-4 mb-4 px-1" key={index}>
                    <img src={game.image_url} className='img-fluid rounded-4 shadow' alt="" />
                    <div className='text-center'>
                      <small>{game.name}</small>
                    </div>
                </Link>
            )): (
                <div className='text-center'>
                    {!loading && <h5 className='mt-5'>Games not found</h5>}
                </div>
            )}
        </div>
    </div>
  )
}
