import React, { FC } from "react";
import { Root, Action, Item } from "../style";
import { Link } from "../../ui";

interface ScoreProps {
  score: any;
}

const Score: FC<ScoreProps> = ({ score }) => {
  const headerForm = JSON.parse(score.headerForm);
  return (
    <Root>
      <Item>
        {score._id && (
          <Action>
            <div
              className={
                "score-row " + (score._id === "header" && "score-header")
              }
            >
              <div className="score-entry">{headerForm.song}</div>
              <div className="score-entry">{headerForm.singer}</div>
              <div className="score-entry">{headerForm.composer}</div>
              <div className="score-entry">
                <Link disableBorderOnHover href={`/scores/${score._id}`}>
                  open
                </Link>
              </div>
            </div>
          </Action>
        )}
      </Item>
    </Root>
  );
};

export default Score;
