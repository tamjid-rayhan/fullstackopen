import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (<tr><td>{props.text}</td><td>{props.value}</td></tr>)
}

const Statistics =({good ,neutral, bad}) => {
  const total = good+bad+neutral;
  const avg = (good -bad)/total;
  const positive = (good/total)*100;
  if (total>0){
    return (<table>
              <tbody>
                <StatisticLine text='good' value={good}/>
                <StatisticLine text='neutral' value={neutral}/>
                <StatisticLine text='bad' value={bad}/>
                <StatisticLine text='all' value={total}/>
                <StatisticLine text='average' value={avg}/>
                <StatisticLine text='positive' value={positive+" %"}/>
              </tbody>
              
            </table>
          );
  }
  
  return (<div>No feedback given</div>);
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{setGood(good+1)};
  const handleNeutralClick = () => {setNeutral(neutral + 1)};
  const handleBadClick = () => {setBad(bad+1)};
  
  return (
    <div>
      <h1>give feedback</h1>

      <Button text='good' onClick={handleGoodClick}/>
      <Button text='neutral' onClick={handleNeutralClick}/>
      <Button text='bad' onClick={handleBadClick}/>
      
      <h2>statistics</h2>

      
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
