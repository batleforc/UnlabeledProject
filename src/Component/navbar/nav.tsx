import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const NavButton = ({ Bot }: any) => {
  return (
    <div
      id="Nav"
      className={`flex-1 flex justify-center place-items-center ${
        Bot.user !== undefined ? "" : "hidden"
      }`}
    >
      <Link to="/voice">Voice</Link>
    </div>
  );
};

export default connect((state) => state)(NavButton);
