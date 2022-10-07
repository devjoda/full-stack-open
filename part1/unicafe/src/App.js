import {useState} from 'react'

const Button = ({handleClick, label}) => {
  return <button onClick={handleClick}>{label}</button>
}

const FeedbackComponent = ({incrementGood, incrementNeutral, incrementBad}) => {
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={incrementGood} label='good' />
      <Button handleClick={incrementNeutral} label='neutral' />
      <Button handleClick={incrementBad} label='bad' />
    </div>
  )
}

const StatisticsLine = ({label, value}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalSubmissions = good + neutral + bad
  const averageScore =
    totalSubmissions > 0 ? ((good - bad) / totalSubmissions).toFixed(1) : null
  const positiveSubmissionsPercentage =
    totalSubmissions > 0 ? ((good / totalSubmissions) * 100).toFixed(1) : null
  return (
    <div>
      <h2>statistics</h2>
      {totalSubmissions > 0 ? (
        <table>
          <tbody>
            <StatisticsLine label='good' value={good} />
            <StatisticsLine label='neutral' value={neutral} />
            <StatisticsLine label='bad' value={bad} />
            <StatisticsLine label='all' value={totalSubmissions} />
            <StatisticsLine label='average' value={averageScore} />
            <StatisticsLine
              label='positive'
              value={`${positiveSubmissionsPercentage} %`}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <FeedbackComponent
        incrementGood={incrementGood}
        incrementNeutral={incrementNeutral}
        incrementBad={incrementBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
