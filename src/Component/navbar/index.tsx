import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import VoiceNav from "./VoiceNav";
import MenuBurger from "./Burger/index";
export const index = ({ Bot, ...props }: any) => {
  return (
    <div>
      <TopNavBar />
      <MenuBurger />
      <Route path="/voice" component={VoiceNav} />
    </div>
  );
};

export default connect((state) => state)(index);
