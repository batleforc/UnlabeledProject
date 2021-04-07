import React from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import { setBurger } from "../../../Action/showModal";
import { BurgerItem } from "./BurgerItem";
import VoicePlayer from '../../Voice/VoicePlayer'
var link = [
  {
    to: "/token",
    label: "Bot",
    Icon: ({ className }: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      </svg>
    ),
  },
  {
    to: "/voice",
    label: "Voice",
    Icon: ({ className }: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        />
      </svg>
    ),
  },
];

export const index = ({ ShowModal, dispatch, ...props }: any) => {
  return (
    <Menu
      isOpen={ShowModal.Burger}
      onClose={() => dispatch(setBurger(false))}
      customBurgerIcon={false}
      customCrossIcon={false}
      right
      className="bg-grey"
      disableAutoFocus
    >
      <div>
        <VoicePlayer />
      </div>
      <div className="flex flex-col">
        {link.map((value: any, index: number) => (
          <BurgerItem key={index} {...value} />
        ))}
      </div>
    </Menu>
  );
};

export default connect((state) => state)(index);
