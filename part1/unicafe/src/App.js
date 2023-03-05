import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Stat = (props) => {
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

  const rateGood = () => {
    setGood((oldVal) => oldVal + 1);
  };

  const rateNeutral = () => {
    setNeutral((oldVal) => oldVal + 1);
  };

  const rateBad = () => {
    setBad((oldVal) => oldVal + 1);
  };

  return (
    <>
      <h2>give feedback</h2>
      <div className="buttons-container">
        <Button text="good" handleClick={rateGood} />
        <Button text="neutral" handleClick={rateNeutral} />
        <Button text="bad" handleClick={rateBad} />
      </div>
      <div className="results">
        <h2>statistics</h2>
        <Stat label="good" stateVar={good} />
        <Stat label="neutral" stateVar={neutral} />
        <Stat label="bad" stateVar={bad} />
      </div>
    </>
  );
};

export default App;
