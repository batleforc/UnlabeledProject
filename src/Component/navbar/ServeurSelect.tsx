import React from "react";
import { connect } from "react-redux";
import { BotServeurChanGetter } from "../../Action/Bot";
import { setChanId } from "../../Action/Voice";

export const ServeurSelect = ({ Bot, dispatch }: any) => {
  if (Bot.Serveur.message !== undefined) return <div></div>;
  return (
    <div
      id="Nav"
      className={`flex justify-center place-items-center ${
        Bot.user !== undefined ? "" : "hidden"
      }`}
    >
      {Bot.ActiveServeur !== "-1" && (
        <img
          alt="Serveur logo"
          className="z-10 h-9 w-9 rounded"
          src={
            Bot.Serveur.find((value: any) => value.id === Bot.ActiveServeur)
              ?.Icon
          }
        />
      )}
      <select
        onChange={(event) =>
          dispatch(BotServeurChanGetter(event.currentTarget.value))
            .then(()=>dispatch(setChanId("-1")))
        }
        value={Bot.ActiveServeur}
        className="bg-grey focus:outline-none select-none"
      >
        <option className="text-black" value={-1} key="none" disabled>
          Selection d'une guild
        </option>
        {Bot.Serveur.length===0&&<option className="text-black" disabled value={-3} key="nope">Invite ton bot dans une guild</option>}
        {Bot.Serveur.message === undefined &&
          Bot.Serveur.map((serveur: any, index: number) => (
            <option className="text-black" value={serveur.id} key={serveur.id}>
              {serveur.ServeurName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default connect((state) => state)(ServeurSelect);
