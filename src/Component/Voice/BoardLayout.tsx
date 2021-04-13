import React from "react";
import { connect } from "react-redux";
import GridLayout from "react-grid-layout";
import { removeButton, setHandlerLayout, loadButton } from "../../Action/sBoard";
import { startVoice } from "../../Action/Voice";
import { showCreateButton } from "../../Action/showModal";

const BoardLayout = ({ sBoard, dispatch, Voice }: any) => {
  // eslint-disable-next-line
  var enumMedia = { 0: "mp3", 1: "YouTube", 2: "spotify" };
  return (
    <GridLayout
      onLayoutChange={(Layout: GridLayout.Layout[]) =>
        dispatch(setHandlerLayout(Layout))
      }
      className="layout overflow-auto h-full w-full"
      layout={sBoard.ActiveLayout}
      cols={11}
      rowHeight={30}
      width={1200}
    >
      {sBoard.ActiveLayout.map((value: any, index: number) => (
        <div
          key={value.i}
          className="rounded-md bg-gradient-to-r from-indigo-200 to-blue-200 border-black border-2 cursor-pointer select-none overflow-hidden text-center"
          onClick={() => {
            if (value.static)
              dispatch(
                startVoice({
                  song: {
                    title: value.text,
                    url: value.url,
                    type: value.type,
                  },
                  now: Voice.Asap,
                })
              );
          }}
        >
          {value.text}
          {!value.static && (
            <div className="flex justify-center" >
              <svg
                onDoubleClick={() => dispatch(removeButton(index))}
                className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5"
                style={{ width: "24px", height: "24px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  dispatch(loadButton(index))
                  dispatch(showCreateButton())
                }}
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </GridLayout>
  );
};

export default connect((state) => state)(BoardLayout);
