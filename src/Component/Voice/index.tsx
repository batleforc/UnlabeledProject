import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GetBoard, setActiveBoard } from "../../Action/sBoard";
import AddButtonModal from "./AddButtonModal";
import AddTabModal from "./AddTabModal";
import BoardLayout from "./BoardLayout";
import BoardParam from "./BoardParam";
import ImportExportModal from './impExport'

export const Index = ({ sBoard, ShowModal, Voice, dispatch }: any) => {
  // eslint-disable-next-line
  useEffect(() => dispatch(GetBoard()), []);
  return (
    <div className=" w-full flex flex-nowrap">
      <div className="flex-1">
        <nav className="flex flex-row">
          {Array.isArray(sBoard.Board) &&
            sBoard.Board.map((value: any, index: number) => (
              <button
                className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                  sBoard.ActiveBoard === index
                    ? "border-b-2 font-medium border-blue-500"
                    : ""
                }`}
                onClick={() => {
                  dispatch(setActiveBoard(index));
                }}
                key={value.id}
                value={value.id}
              >
                {value.label}
              </button>
            ))}
        </nav>
        <BoardLayout />
      </div>
      {ShowModal.boardParam && <BoardParam />}
      {ShowModal.queueSlide && (
        <div className="border flex-col">
          <p>File d'attente :</p>
          {Voice.Queue.map((value: any,index:number) => {
            return <div key={index}>{value.title}</div>;
          })}
        </div>
      )}
      <AddButtonModal />
      <AddTabModal />
      <ImportExportModal />
    </div>
  );
};

export default connect((state) => state)(Index);
