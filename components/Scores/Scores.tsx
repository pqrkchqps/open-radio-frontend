import axios from "axios";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Root } from "./style";
import { RootState } from "../../store";
import Score from "./Score/Score";
import { Button } from "../ui";

interface ScoresProps {
  userId?: string;
}

const fetchScores = async () => {
  const { data } = await axios.get("/scores");
  return data;
};

const Scores: FC<ScoresProps> = ({ userId }) => {
  const router = useRouter();
  const { data: scores } = useQuery(["scores"], fetchScores);

  const openCreateNewScore = () => {
    router.push("/scores");
  };

  console.log(scores);
  return (
    <Root>
      <Button
        color="primary"
        className="add-score-btn"
        onClick={openCreateNewScore}
      >
        Create New Score
      </Button>
      <Score
        key="header"
        score={{
          _id: "header",
          headerForm: JSON.stringify({
            song: "Song",
            singer: "Singer",
            composer: "Composer",
          }),
        }}
      />
      {scores && scores.map((score) => <Score key={score._id} score={score} />)}
    </Root>
  );
};

export default Scores;
