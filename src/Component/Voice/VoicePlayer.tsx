import React from "react";
import { connect } from "react-redux";
import { resumeVoice, stopVoice, setVolume } from "../../Action/Voice";
const VoicePlayer = ({ dispatch, Voice, ...props }: any) => {
  return (
    <div
      className={`${
        Voice.Status ? "" : "hidden"
      } self-center justify-end flex flex-1`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => dispatch(resumeVoice())}
        className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5"
        style={{ width: "24px", height: "24px" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => dispatch(stopVoice())}
        className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5"
        style={{ width: "24px", height: "24px" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <label htmlFor="volume">Volume:</label>
        <input
          className="bg-grey"
          type="number"
          name="volume"
          min="0"
          max="10"
          onChange={(event) => dispatch(setVolume(Number(event.target.value)))}
          value={Voice.Volume}
        />
      </div>
    </div>
  );
};

export default connect((state) => state)(VoicePlayer);
