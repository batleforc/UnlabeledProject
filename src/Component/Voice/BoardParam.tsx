import React from "react";
import { connect } from "react-redux";
import { DeleteBoard, lock, unLock, UpdateBoard } from "../../Action/sBoard";
import { setImportExport, showCreateButton, showCreateTab } from "../../Action/showModal";

const BoardParam = ({ dispatch, sBoard }: any) => {
  return (
    <div className="border flex-col">
        <div className="flex flex-col">
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            onClick={() => dispatch(showCreateTab())}
          >
            Créer un Board
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onDoubleClick={() =>
              dispatch(
                DeleteBoard({ tabId: sBoard.Board[sBoard.ActiveBoard].id })
              )
            }
          >
            Supprimer le Board
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onClick={() => dispatch(showCreateButton())}
          >
            Créer un Son
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onClick={() => dispatch(lock())}
          >
            Verrouiller les Sons
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onClick={() => dispatch(setImportExport(true))}
          >
            Import/Export <br/>
            Dans le board actif
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onClick={() => dispatch(unLock())}
          >
            Déverrouiller les Sons
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onClick={() =>
              dispatch(
                UpdateBoard({
                  tabId: sBoard.Board[sBoard.ActiveBoard].id,
                  content: sBoard.ActiveLayout,
                })
              )
            }
          >
            Sauvegarder le Board
          </button>
        </div>
    </div>
  );
};

export default connect((state) => state)(BoardParam);
