import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatsLine = (props) => {
  return (
    <p>
      {props.label} {props.stateVar}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const rate = (setStateVar) => {
    const nextRatingsArr = ratings.concat(getScore(setStateVar));
    setRatings(nextRatingsArr);
    setStateVar((stateVar) => stateVar + 1);
    setAll((all) => nextRatingsArr.length);
    calcAvg(nextRatingsArr);
    calcPositive(nextRatingsArr);
  };

  const calcAvg = (arr) => {
    const arrAvg =
      arr.reduce((partialSum, a) => partialSum + a, 0) / arr.length;
    setAvg(arrAvg.toFixed(2));
  };

  const calcPositive = (arr) => {
    const counts = {};
    arr.forEach((el) => {
      counts[el] = counts[el] ? counts[el] + 1 : 1;
    });
    const x = counts[1] > 0 ? (counts[1] / arr.length) * 100 : 0;
    console.log(`${x.toFixed(2)} %`);
    setPositive((oldVal) => `${x.toFixed(2)} %`);
  };

  const getScore = (setter) => {
    if (setter === setGood) {
      return 1;
    }
    if (setter === setNeutral) {
      return 0;
    }
    return -1;
  };

  return (
    <>
      <h2>give feedback</h2>
      <div className="buttons-container">
        {/* <Button text="good" handleClick={rateGood} /> */}
        <Button text="good" handleClick={() => rate(setGood)} />
        <Button text="neutral" handleClick={() => rate(setNeutral)} />
        <Button text="bad" handleClick={() => rate(setBad)} />
      </div>
      <div className="results">
        <h2>statistics</h2>
        <StatsLine label="good" stateVar={good} />
        <StatsLine label="neutral" stateVar={neutral} />
        <StatsLine label="bad" stateVar={bad} />
        <StatsLine label="all" stateVar={all} />
        <StatsLine label="average" stateVar={avg} />
        <StatsLine label="positive" stateVar={positive} />
        <p id="arr">{`[${ratings.join(",")}]`}</p>
      </div>
    </>
  );
};

export default App;
