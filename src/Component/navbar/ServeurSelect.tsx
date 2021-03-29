import React from "react";
import { connect } from "react-redux";
import { BotServeurChanGetter } from "../../Action/Bot";

export const ServeurSelect = ({ Bot, dispatch }: any) => {
  if (Bot.Serveur.message !== undefined) return <div></div>;
  return (
    <div
      id="Nav"
      className={`flex-1 flex justify-center place-items-center ${
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
        }
        value={Bot.ActiveServeur}
        className="bg-secondary focus:outline-none"
      >
        <option value={-1} key="none" disabled>
          Select a serveur
        </option>
        {Bot.Serveur.message === undefined &&
          Bot.Serveur.map((serveur: any, index: number) => (
            <option value={serveur.id} key={serveur.id}>
              {serveur.ServeurName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default connect((state) => state)(ServeurSelect);
