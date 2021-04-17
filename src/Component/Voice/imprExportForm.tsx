import React from "react";
import { connect } from "react-redux";
import { updateBoard } from "../../Action/sBoard";

const ImportExportForm = ({ ShowModal, sBoard, dispatch }: any) => {
  var [code, setCode] = React.useState("");
  React.useEffect(() => {
    setCode(JSON.stringify(sBoard.ActiveLayout));
    // eslint-disable-next-line
  }, [sBoard.ActiveLayout]);
  return (
    <div>
      <textarea
        className="h-32 w-96"
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
      />
      <button
        onClick={() => dispatch(updateBoard(code))}
        className=" bg-white py-1 my-3 text-center rounded-md border border-primary px-2"
      >
        Update board
        <br />
        <span className="text-xs">Pensez a sauvegarder le board</span>
      </button>
    </div>
  );
};

export default connect((state) => state)(ImportExportForm);
