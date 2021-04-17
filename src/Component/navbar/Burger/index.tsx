import React from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import { setBurger } from "../../../Action/showModal";
import BurgerItem from "./BurgerItem";
import VoicePlayer from "../../Voice/VoicePlayer";
var link = [
  {
    to: "/token",
    label: "Bot",
    Icon: ({ className }: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      x="0"
      y="0"
      viewBox="0 0 8.467 10.583"
    >
      <g strokeWidth="0.265" color="#000" fontFamily="sans-serif">
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M1.191 291.377a.402.402 0 00-.398.398v1.586c0 .218.18.399.398.399h.53a.132.132 0 00.13-.133v-2.117a.132.132 0 00-.13-.133h-.53zm0 .266h.397v1.851H1.19a.131.131 0 01-.132-.133v-1.586c0-.074.058-.132.132-.132z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinejoin="round"
          d="M.793 293.031l.002 3.44a.132.132 0 00.133.133h1.19a.132.132 0 00.13-.133v-.178a.66.66 0 00-.193-.467l-.164-.166a.129.129 0 01-.04-.092v-.552a.398.398 0 00-.396-.397H1.06v-1.588H.793zm.268 1.852h.394c.075 0 .133.058.133.133v.552c0 .106.04.205.115.28l.164.164a.4.4 0 01.117.281v.045h-.923v-1.455z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          d="M1.324 293.56v1.192h.266v-1.191h-.266z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinejoin="round"
          d="M1.72 291.643v.263h.926v2.117h-.398v.264h.53a.132.132 0 00.132-.13v-2.382a.132.132 0 00-.133-.132H1.721z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          d="M1.72 292.898v.266h.464v-.266H1.72z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.236 290.98a.132.132 0 00-.119.133v3.969a.132.132 0 00.131.133h3.969a.132.132 0 00.133-.133v-3.969a.132.132 0 00-.133-.133H2.248a.132.132 0 00-.012 0zm.145.266h3.705v3.703H2.38v-3.703z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinejoin="round"
          d="M2.74 294.988l-.187.188.306.306a.666.666 0 00.47.196h1.81a.661.661 0 00.466-.196l.31-.306-.188-.188-.307.309a.397.397 0 01-.281.115h-1.81a.397.397 0 01-.282-.115l-.307-.309z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          d="M3.902 288.93c-.984 0-1.785.802-1.785 1.787v.396h.264v-.396c0-.842.68-1.522 1.521-1.522h.662c.842 0 1.522.68 1.522 1.522v.396h.264v-.396c0-.985-.8-1.787-1.786-1.787h-.662z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinejoin="round"
          d="M5.28 289.988a.132.132 0 00-.12.133v.53a.132.132 0 00.131.132h.926v-.265h-.793v-.264h.67v-.266H5.29a.132.132 0 00-.012 0z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          strokeLinejoin="round"
          d="M4.232 289.922a.465.465 0 00-.462.463.465.465 0 00.927 0 .466.466 0 00-.465-.463zm0 .265c.112 0 .2.087.2.198 0 .11-.088.199-.2.199a.196.196 0 01-.197-.2c0-.11.086-.197.197-.197z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          d="M2.646 289.525v.266H5.82v-.266H2.646z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinejoin="round"
          d="M2.373 289.988v.266h.67v.264h-.795v.265h.928a.132.132 0 00.13-.133v-.529a.132.132 0 00-.13-.133h-.803z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.746 291.377a.132.132 0 00-.13.133v2.117a.132.132 0 00.13.133h.53c.217 0 .398-.181.398-.399v-1.586a.402.402 0 00-.399-.398h-.529zm.133.266h.396c.075 0 .133.058.133.132v1.586a.131.131 0 01-.133.133H6.88v-1.851z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.525 293.03a.132.132 0 00-.117.134v1.455h-.396a.398.398 0 00-.397.397v.552a.129.129 0 01-.039.092l-.164.166a.661.661 0 00-.195.467v.178a.132.132 0 00.133.133h1.19a.132.132 0 00.132-.133l.002-1.715v-.006a.132.132 0 000-.006v-1.58a.132.132 0 00-.149-.135zm-.513 1.853h.394v1.455h-.924v-.045c0-.105.041-.207.116-.281l.166-.164a.393.393 0 00.115-.28v-.552c0-.075.058-.133.133-.133z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          d="M6.877 293.56v1.192h.266v-1.191h-.266zM6.283 292.898v.266h.463v-.266h-.463z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.174 295.41a.132.132 0 00-.121.082l-.397.926a.132.132 0 00.121.186H5.69a.132.132 0 00.122-.186l-.397-.926a.133.133 0 00-.244.106l.316.74H2.98l.317-.74a.132.132 0 00-.123-.188z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          d="M4.102 295.545v.53h.263v-.53h-.263z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinejoin="round"
          d="M5.676 291.643a.132.132 0 00-.12.132v2.381a.132.132 0 00.133.131h.528v-.264H5.82v-2.117h.926v-.263H5.69a.132.132 0 00-.013 0z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
          }}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.309 291.906a.133.133 0 100 .266h1.85a.133.133 0 000-.266h-1.85zM3.297 292.436a.133.133 0 00.012.265h1.85a.133.133 0 000-.265h-1.85a.132.132 0 00-.012 0z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
        <path
          style={{
            lineHeight: "normal",
            textIndent: "0",
            textAlign: "start",
            WebkitTextDecorationLine: "none",
            textDecorationLine: "none",
            WebkitTextDecorationStyle: "solid",
            textDecorationStyle: "solid",
            WebkitTextDecorationColor: "#000000",
            textDecorationColor: "#000000",
            textTransform: "none",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal"
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.691 293.098a.132.132 0 00-.119.132v1.323a.132.132 0 00.133.133h1.057a.132.132 0 00.133-.133v-1.323a.132.132 0 00-.133-.132H3.705a.132.132 0 00-.014 0zm.145.263h.795v1.059h-.795v-1.059z"
          enableBackground="accumulate"
          overflow="visible"
          transform="translate(0 -288.533)"
        ></path>
      </g>
    </svg>
    ),
  },
  {
    to: "/voice",
    label: "SoundBoard",
    disabled: ({ Bot }: any = {}) => Bot?.user === undefined,
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
  {
    to: "https://batleforc.github.io/UnlabeledProject/",
    href: true,
    label: "Documentation",
    Icon: ({ className }: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
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
      <div className="flex flex-col select-none focus:outline-none">
        {link.map((value: any, index: number) => (
          <BurgerItem key={index} {...value} />
        ))}
      </div>
    </Menu>
  );
};

export default connect((state) => state)(index);
