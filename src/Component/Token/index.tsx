import React from "react";
import { connect } from "react-redux";
import TokenItem from "./TokenItem";
import { showTokenForm } from "../../Action/showModal";
import { Link } from "react-router-dom";

export const index = ({ Token, dispatch, Bot, ...props }: any) => {
  return (
    <div className="px-2">
      {Token.Pending && <div></div>}
      <p>Liste des Bot:</p>
      <div className="flex my-2">
        {!Token.Pending && Token.AllToken.length === 0 && (
          <div>
            <p>Aucun Token disponible</p>
            <p>Veuillez en créer un</p>
            <TokenItem load={true} />
          </div>
        )}
        {Token.AllToken.map((value: any) => (
          <TokenItem key={value.token} value={value} />
        ))}
      </div>
      <input
        className="bg-grey text-white rounded-md px-1"
        type="button"
        value="Add Bot"
        onClick={() => dispatch(showTokenForm())}
      />
      {Bot.ActiveBot !== -1 && (
        <div className="flex flex-col">
          <h1>Bot actif :</h1>
          <div className="flex m-2">
            <img
              alt="Icon du bot"
              className="w-24 h-24 rounded"
              src={Bot.user.avatarURL}
            />
            <div className="p-2 flex-1">
              <p>Username : {Bot.user.username}</p>
              <p>Tag : {Bot.user.tag} </p>
            </div>
            <div className="justify-self-end flex-2">
              <h2>Guild disponible:</h2>
              {Bot.Serveur.map((value: any) => (
                <div key={value.id}> =&gt;{value.ServeurName}</div>
              ))}
            </div>
          </div>
          <Link
            className="hover:bg-gray-200 mx-0.5 m-2 rounded-md self-center"
            to="/voice"
          >
            Vers la SoundBoard
          </Link>
        </div>
      )}
    </div>
  );
};

export default connect((state) => state)(index);
