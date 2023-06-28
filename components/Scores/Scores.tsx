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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScoresProps {}

const fetchMyScores = async () => {
  const { data } = await axios.get("/scores");
  return data;
};

const fetchAllScores = async () => {
  const { data } = await axios.get("/scores/all");
  return data;
};

const Scores: FC<ScoresProps> = () => {
  const router = useRouter();
  const { data: myScores } = useQuery(["scores"], fetchMyScores);
  const { data: allScores } = useQuery(["scores/all"], fetchAllScores);

  const openCreateNewScore = () => {
    router.push("/scores");
  };

  console.log(myScores);
  console.log(allScores);
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
      <h3>My Scores</h3>
      {myScores &&
        myScores.map((score) => <Score key={score._id} score={score} />)}
      <h3>All Scores</h3>
      {allScores &&
        allScores.map((score) => <Score key={score._id} score={score} />)}
    </Root>
  );
};

export default Scores;
