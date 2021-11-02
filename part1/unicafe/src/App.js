import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const Stat = ({ name, quantity }) => {
  return (
    <div>
      {name} {quantity}
    </div>
  );
};
const Statistics = ({good, neutral, bad}) => {
  let total = (good + neutral + bad) 
  let average = (good - bad)/3
  let positive = good/total
  return (
    <div>
      <Stat name="good" quantity={good} />
      <Stat name="neutral" quantity={neutral} />
      <Stat name="bad" quantity={bad} />
      <Stat name="average" quantity={average} />
      <Stat name="positive" quantity={positive} />
    </div>
  );
};



const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Increment object returns functions which increase the value of good, neutral, and bad by one.
  const increment = {
    good: () => setGood(good + 1),
    neutral: () => setNeutral(neutral + 1),
    bad: () => setBad(bad + 1),
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={increment.good} />
      <Button text="neutral" onClick={increment.neutral} />
      <Button text="bad" onClick={increment.bad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
