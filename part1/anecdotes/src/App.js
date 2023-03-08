import React, { useState } from "react";

const Button = (props) => {
  return (
    <button onClick={props.handleClick || props.onVoteClick}>
      {props.children}
    </button>
  );
};

const MostedVoted = (props) => {
  let voteSummary = <p>No votes made yet.</p>;
  if (props.voteMade) {
    voteSummary = (
      <>
        <p>{props.anecdotes[props.highestVoted]}</p>
        <p>has {props.points[props.highestVoted]} points</p>
      </>
    );
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {voteSummary}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [voteMade, setVoteMade] = useState(false);
  const [highestVoted, setHighestVoted] = useState();
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 8));
  };

  const voteHandler = () => {
    const newPoints = { ...points };
    newPoints[selected] += 1;
    setPoints((points) => newPoints);
    checkHighest(newPoints);
  };

  const checkHighest = (latestPoints) => {
    let highestVoteCount = 0;
    let highestIdx = 0;
    for (const [idx, value] of anecdotes.entries()) {
      if (latestPoints[idx] > highestVoteCount) {
        highestIdx = idx;
        highestVoteCount = latestPoints[idx];
      }
    }
    setHighestVoted(highestIdx);
    setVoteMade(true);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Button onVoteClick={voteHandler}>vote</Button>
      <Button handleClick={handleClick}>next anecdote</Button>
      <MostedVoted
        anecdotes={anecdotes}
        voteMade={voteMade}
        highestVoted={highestVoted}
        points={points}
      />
    </div>
  );
};

export default App;
