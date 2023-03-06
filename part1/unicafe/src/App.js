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

  const rate = (stateVar, setStateVar) => {
    setStateVar(stateVar + 1);
  };

  return (
    <>
      <h2>give feedback</h2>
      <div className="buttons-container">
        <Button text="good" handleClick={() => rate(good, setGood)} />
        <Button text="neutral" handleClick={() => rate(neutral, setNeutral)} />
        <Button text="bad" handleClick={() => rate(bad, setBad)} />
      </div>
      <div className="results">
        <h2>statistics</h2>
        <StatsLine label="good" stateVar={good} />
        <StatsLine label="neutral" stateVar={neutral} />
        <StatsLine label="bad" stateVar={bad} />
      </div>
    </>
  );
};

export default App;
