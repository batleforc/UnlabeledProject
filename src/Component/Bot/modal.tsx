import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";

import { CanPlay } from "../../Action/Bot";

const BotCanPlay = ({ Bot, dispatch }: any) => {
  return (
    <Modal
      warn={false}
      on={!Bot.canPlay.canPlay}
      exitOnEscape={false}
      title="Ffmpeg unavailable"
      activate={() => {
        dispatch(CanPlay());
      }}
      activateText="TryAgain"
      Content={() => (
        <div>
          {Bot.canPlay.canPlay !== true && (
            <div>
              <h1>Les binaries ffmpeg ne sont pas disponible</h1>
              <p>
                Afin de pouvoir utiliser le bot veuillez télécharger l'archive
                contenant les exécutable nécessaire :
              </p>
              <a
                href={`${Bot.canPlay.ffmpeg}${
                  Bot.canPlay.link[
                    Bot.canPlay.os === "win32" ? "win" : Bot.canPlay.os
                  ] || ""
                }`}
              >
                {" "}
                =&gt;Ffmpeg.org
              </a>
              <p>
                Une fois l'archive télécharger veuillez placer sont contenue
                dans :
              </p>
              <code>{Bot.canPlay.where}\</code>
              <a href="https://batleforc.github.io/UnlabeledProject/">
                La documentation
              </a>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default connect((state) => state)(BotCanPlay);
