import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const BurgerItem = ({
  Icon = () => <div></div>,
  label,
  to,
  Bot,
  href=false,
  disabled = () => false,
}: any) => {
  if (disabled(Bot))
    return (
      <span className="select-none flex flex-row place-items-center justify-center m-2 rounded-md hover:bg-gray-200 mx-0.5">
        <Icon className="z-10 w-9 mx-0.5" />
        <p>{label}</p>
      </span>
    );
  if (href)
    return (
      <a rel="noreferrer" target="_blank" href={to} className="flex flex-row place-items-center justify-center m-2 rounded-md mx-0.5" >
        <Icon className="z-10 w-9 mx-0.5" />
      <p>{label}</p>
      </a>
    );
  return (
    <Link
      to={to}
      className="flex flex-row place-items-center justify-center m-2 rounded-md mx-0.5"
    >
      <Icon className="z-10 w-9 mx-0.5" />
      <p>{label}</p>
    </Link>
  );
};

export default connect((state) => state)(BurgerItem);
