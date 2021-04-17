import React from "react";
import { connect } from "react-redux";
import {
  setButton,
  setUrl,
  addButton,
  setType,
  editButton,
} from "../../Action/sBoard";
import { startVoice } from "../../Action/Voice";

export const ButtonForm = ({ dispatch, Voice, sBoard, ...props }: any) => {
  var send = () => {
    if (sBoard.button.length >= 2 && sBoard.url.length >= 2) {
      dispatch((sBoard.editing ? editButton : addButton)());
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
            value={sBoard.button}
            onChange={(event) => dispatch(setButton(event.currentTarget.value))}
          />
        </label>
        <label className="block text-center">
          <span>url</span>
          <input
            className="px-1 rounded-md border border-primary block"
            placeholder="url"
            type="text"
            name="Token"
            value={sBoard.url}
            onChange={(event) => dispatch(setUrl(event.currentTarget.value))}
          />
        </label>
        <select
          onChange={(e) => dispatch(setType(e.currentTarget.value))}
          value={sBoard.type}
          className="py-1 my-3 text-center rounded-md border border-primary px-2"
        >
          <option key="0" disabled>
            Selection du type d'audio
          </option>
          <option key="1" value={1}>
            fichier direct
          </option>
          <option key="2" value={2}>
            YouTube
          </option>
          <option key="3" value={3} disabled>
            Spotify
          </option>
        </select>
        <button
          onClick={() =>
            dispatch(
              startVoice({
                song: {
                  title: sBoard.button,
                  url: sBoard.url,
                  type: sBoard.type,
                },
                now: true,
              })
            )
          }
          className=" text-xs text-center rounded-md border border-primary px-2"
        >
          Try It
        </button>
        <input
          disabled={sBoard.Pending}
          className="py-1 my-3 text-center rounded-md border border-primary px-2"
          type="button"
          name="send"
          value="Send"
          onClick={send}
        />
      </div>
    </div>
  );
};

export default connect((state) => state)(ButtonForm);
