import React from "react";
import { connect } from "react-redux";
import { setBoardParam } from "../../Action/showModal";
import ChanSelect from "./ChanSelect";
import ServeurSelect from "./ServeurSelect";
export const VoiceNav = ({ Voice, Bot, dispatch, ShowModal }: any) => {
  return (
    <nav className="bg-grey text-white flex">
      <div className={`${Bot.user !== undefined ? "" : "hidden"} flex flex-1`}>
        {Bot.user !== undefined && <ServeurSelect />}
        {Bot.user !== undefined && <ChanSelect />}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-md z-10 w-9 hover:bg-gray-200 mx-0.5 flex-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => dispatch(setBoardParam(!ShowModal.boardParam))}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </nav>
  );
};

export default connect((state) => state)(VoiceNav);
