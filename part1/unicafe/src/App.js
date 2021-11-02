import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = ({ name, quantity }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = (good - bad) / 3;
  let positive = (good / total) * 100;
  if (total) {
    return (
      <table>
        <tbody>
          <StatisticLine name="good" quantity={good} />
          <StatisticLine name="neutral" quantity={neutral} />
          <StatisticLine name="bad" quantity={bad} />
          <StatisticLine name="average" quantity={average} />
          <StatisticLine name="positive" quantity={positive + " %"} />
        </tbody>
      </table>
    );
  }
  return <div>No feedback given</div>;
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
