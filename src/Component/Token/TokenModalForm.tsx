import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import TokenForm from "./TokenForm";
import { hideTokenForm } from "../../Action/showModal";

const TokenModalForm = ({ ShowModal, dispatch }: any) => {
  return (
    <Modal
      warn={false}
      on={ShowModal.TokenForm}
      exitOnEscape={true}
      title="Create Token : "
      activate={() => {
        dispatch(hideTokenForm());
      }}
      activateText="Exit"
      Content={TokenForm}
    />
  );
};

export default connect((state) => state)(TokenModalForm);
