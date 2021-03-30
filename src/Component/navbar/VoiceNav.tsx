import React from "react";
import { connect } from "react-redux";
import VoicePlayer from '../Voice/VoicePlayer'
import {
  joinChan,
  leaveChan,
  setChanId,
} from "../../Action/Voice";
import { showCreateTab } from "../../Action/showModal";
export const VoiceNav = ({ Voice, Bot, dispatch }: any) => {
  return (
    <nav className="bg-grey text-white flex">
      <div className={`${Bot.user !== undefined ? "" : "hidden"} flex`}>
        <select
          className="bg-grey focus:outline-none"
          value={Voice.ChanId}
          onChange={(event) => dispatch(setChanId(event.currentTarget.value))}
        >
          <option className="text-black" value={-1} key="none" disabled>
            Select a VoiceChannel
          </option>
          {Bot.ActiveServeur !== -1 &&
            Bot.ServeurChan?.filter((value: any) => value.type === "voice").map(
              (value: any) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              )
            )}
        </select>
        <button
          disabled={Voice.ChanId === "-1"}
          className="px-1 mx-4 my-1 bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50"
          onClick={() =>
            dispatch(
              joinChan({ guildId: Bot.ActiveServeur, ChanId: Voice.ChanId })
            )
          }
        >
          Join
        </button>
        <button
          disabled={!Voice.Status}
          className={`px-1 mx-4 my-1 bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
          onClick={() => dispatch(leaveChan())}
        >
          Leave
        </button>
        <button
          className={`px-1 mx-4 my-1 bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
          onClick={() => dispatch(showCreateTab())}
        >
          CreateTab
        </button>
      </div>
      <VoicePlayer />
    </nav>
  );
};

export default connect((state) => state)(VoiceNav);
