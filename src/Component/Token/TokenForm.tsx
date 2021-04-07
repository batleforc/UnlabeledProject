import React, { useState } from "react";
import { connect } from "react-redux";
import { TokenCreate } from "../../Action/Token";

export const TokenForm = ({ dispatch, Token, ...props }: any) => {
  var [label, setLabel] = useState("");
  var [token, setToken] = useState("");
  var send = () => {
    if (label.length >= 2 && token.length >= 2) {
      dispatch(TokenCreate({ label, token }));
      setLabel("");
      setToken("");
    }
  };
  return (
    <div className=" px-3 py-3 space-y-4 justify-self-center">
      <div className="flex flex-col flex-wrap content-center">
        <label className="block text-center">
          <span>Label</span>
          <input
            className="px-1 rounded-md border border-primary block"
            placeholder="Label"
            type="text"
            name="Label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
        </label>
        <label className="block text-center">
          <span>Token</span>
          <input
            className="px-1 rounded-md border border-primary block"
            placeholder="Token"
            type="text"
            name="Token"
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
        </label>
        <input
          disabled={Token.Pending}
          className="py-1 my-3 text-center rounded-md border border-primary px-2"
          type="button"
          name="send"
          value="Send"
          onClick={send}
        />
        <a href="https://batleforc.github.io/UnlabeledProject/docs/GetStarted/creerBot" rel="noreferrer" target="_blank">{">"}comment créer un bot ?{"<"}</a>
      </div>
    </div>
  );
};

export default connect((state) => state)(TokenForm);
