import { useState } from 'react'




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Statistics = ({ good, neutral, bad }) => {

    const all = good + bad + neutral
    const average = (good - bad) / all
    const positive = good / all

    if (all === 0) {
      return (<p>No feedback given</p>)
    } else {

      return (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={positive + "%"} />
          </tbody>
        </table>
      )
    }
  }

  const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

  const Button = (props) => <button onClick={props.handleClickFunction}>{props.text}</button>

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClickFunction={() => setGood(good + 1)} />
      <Button text="neutral" handleClickFunction={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClickFunction={() => setBad(bad + 1)} />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

export default App