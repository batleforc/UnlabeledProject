import React from "react";
import { connect } from "react-redux";
import { DeleteBoard, lock, unLock, UpdateBoard } from "../../Action/sBoard";
import { showCreateButton, showCreateTab } from "../../Action/showModal";

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
            onClick={() =>
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
            Créer un bouton
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onClick={() => dispatch(lock())}
          >
            Verrouiller les bouton
          </button>
          <button
            className={`px-1 mx-4 my-1 text-white bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
            disabled={Number(sBoard.ActiveBoard) <= -1}
            onClick={() => dispatch(unLock())}
          >
            Déverrouiller les bouton
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
            Sauvegarder le tableau
          </button>
        </div>
    </div>
  );
};

export default connect((state) => state)(BoardParam);
