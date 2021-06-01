import React from "react";
import { connect } from "react-redux";
import { BotServeurChanGetter } from "../../Action/Bot";
import { setChanIdAction } from "../../Action/Voice";

const ChanSelect = ({ Bot, dispatch, Voice }: any) => {
  return (
    <select
      className="bg-grey focus:outline-none select-none"
      value={Voice.ChanId}
      onClick={()=>dispatch(BotServeurChanGetter(Bot.ActiveServeur))}
      onChange={(event) => dispatch(setChanIdAction(event.currentTarget.value))}
    >
      <option className="text-black" value={-1} key="none" disabled>
        Rejoindre un chan vocal
      </option>
      <option
        className="text-black"
        value={-2}
        key="none2"
        disabled={Voice.ChanId === "-1"}
      >
        Quitter un chan vocal
      </option>
      {Bot.ServeurChan.length === 0 && (
        <option className="text-black" key="-30" value="-30" disabled>
          Pense a sélectionner une guild
        </option>
      )}
      {Bot.ActiveServeur !== -1 &&
        Bot.ServeurChan?.filter((value: any) => value.type === "voice").map(
          (value: any) => (
            <option key={value.id} value={value.id}>
              {value.name}{"   "}{value.connected.length}/99
            </option>
          )
        )}
    </select>
  );
};

export default connect((state) => state)(ChanSelect);
