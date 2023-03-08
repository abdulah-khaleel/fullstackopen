import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.label}</td>
      <td>{props.stateVar}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine label="good" stateVar={props.good} />
        <StatisticLine label="neutral" stateVar={props.neutral} />
        <StatisticLine label="bad" stateVar={props.bad} />
        <StatisticLine label="all" stateVar={props.all} />
        <StatisticLine label="average" stateVar={props.avg} />
        <StatisticLine label="positive" stateVar={props.positive} />
      </tbody>
    </table>
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
      <h2>statistics</h2>
      {all > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          positive={positive}
          avg={avg}
          ratings={ratings}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

export default App;
