import { useState } from 'react'

const Display = () => <h1>Unicafe Feedback</h1>;

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({text, value}) => {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value} {(text === 'Positive') ? '%' : null} 
      </td>
    </>
  );
};

const Statistics = ({feedback}) => {
  const hasFeedback = feedback.all > 0;
  return (
    <>
      <h2>Statistics</h2>
      {
      hasFeedback ?
      <>
        <table>
          <tbody>
            <tr>
              <StatisticLine text='Good' value={feedback.good} />
            </tr>
            <tr>
              <StatisticLine text='Neutral' value={feedback.neutral} />
            </tr>
            <tr>
              <StatisticLine text='Bad' value={feedback.bad} />
            </tr>
            <tr>
              <StatisticLine text='All' value={feedback.all} />
            </tr>
            <tr>
              <StatisticLine text='Average' value={feedback.average} />
            </tr>
            <tr>
              <StatisticLine text='Positive' value={feedback.positive} />
            </tr>
          </tbody>
        </table>
      </>
      : 
        <p>No feedback given</p>
      }  
    </>
  )
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });
  
  const giveFeedbackFor = (feedback, type) => () => {
    console.log('before', feedback[type]);
    const newFeedbackType = feedback[type] + 1;
    const newFeedbackAll = feedback.all + 1;
    const newFeedbackGood = (type === 'good') ? newFeedbackType : feedback.good;
    const newFeedbackBad = (type === 'bad') ? newFeedbackType : feedback.bad;

    setFeedback({
      ...feedback,
      [type]: newFeedbackType,
      all: newFeedbackAll,
      average: (newFeedbackGood - newFeedbackBad) / newFeedbackAll,
      positive: newFeedbackGood / newFeedbackAll * 100,
    });
    console.log('after', newFeedbackType);
  };

  return (
    <>
      <Display />
      <Button handleClick={giveFeedbackFor(feedback, 'good')} text='good' />
      <Button handleClick={giveFeedbackFor(feedback, 'neutral')} text='neutral' />
      <Button handleClick={giveFeedbackFor(feedback, 'bad')} text='bad' />
      <Statistics feedback={feedback} />
    </>
  )
}

export default App;
