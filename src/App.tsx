import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { effectivenessDetails, evaluateMatchup, getEffectivenessColor, getRandomMatchup, type Effectiveness, type EffectivenessDetail, type Matchup } from './data/weaknesses';
import { TypeIcon } from './helpers/type-icons';

function App() {
  const [currentMatchup, setCurrentMatchup] = useState<Matchup | undefined>();
  const [showResults, setShowResults] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>(undefined);
  const [answersCorrectCount, setAnswersCorrectCount] = useState(0);
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0);
  const scorePercentage = questionsAnsweredCount ? Math.round(answersCorrectCount / questionsAnsweredCount * 100) : 0;
  const currentMatchupResults = useMemo(() => {
    if (!currentMatchup) {
      console.log('No matchup set!');
      return undefined;
    }
    const matchupResults = evaluateMatchup(currentMatchup);
    return matchupResults;
  }, [currentMatchup]);

  const onNewMatchupClick = () => {
    setShowResults(false);
    setLastAnswerCorrect(undefined);
    const newMatchup = getRandomMatchup(2);
    setCurrentMatchup(newMatchup);
  }

  useEffect(() => {
    const newMatchup = getRandomMatchup(1);
    setCurrentMatchup(newMatchup);
  }, [])

  const checkAnswer = (userAnswer: Effectiveness) => {
    if (userAnswer === currentMatchupResults?.totalEffectiveness) {
      setLastAnswerCorrect(true);
      setQuestionsAnsweredCount(questionsAnsweredCount + 1);
      setAnswersCorrectCount(answersCorrectCount + 1);
    } else {
      setQuestionsAnsweredCount(questionsAnsweredCount + 1);
      setLastAnswerCorrect(false);
    }
    setShowResults(true);
  }

  const AnswerButton = ({ effectivenessDetail }: { effectivenessDetail: EffectivenessDetail }) => {
    const onClick = () => checkAnswer(effectivenessDetail.value);
    return (
      <button
        className="answer-button"
        style={{ backgroundColor: getEffectivenessColor(effectivenessDetail.value) }}
        onClick={onClick}>
        {effectivenessDetail.value}x
      </button>
    )
  }

  return (
    <>
      {/* <h1>Pokemon Type Weakness Test</h1> */}
      <div className="card">
        {currentMatchup && (
          <>
            <div className="question-text">
              <span>What is the damage multiplier for the attack?</span>
            </div>
            <div className="matchup-container">
              <div className="matchup-section">
                <div className="matchup-section-text">Attack Type</div>
                <div className="matchup-type-container" style={{ backgroundColor: currentMatchup.attackingType.color }}>
                  <div><TypeIcon type={currentMatchup.attackingType.name} style={{ width: '1em', height: '1em' }} /></div>
                  <div>{currentMatchup.attackingType.name}</div>
                </div>
              </div>
              <div>
                <div style={{fontSize: '3em'}}>Vs.</div>
              </div>
              <div className="matchup-section">
                <div className="matchup-section-text">Defending Types</div>
                {currentMatchup.defendingTypes.map(d => (
                  <div key={d.name} className="matchup-type-container" style={{ backgroundColor: d.color }}>
                    <div><TypeIcon type={d.name} style={{ width: '1em', height: '1em' }} /></div>
                    <div>{d.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '40px' }}>
              {showResults && (
                <>
                  <div className="result-icon" style={{ backgroundColor: lastAnswerCorrect ? 'green' : 'red' }}>
                    {lastAnswerCorrect ? '✔' : '✘'}
                  </div>
                  <div className="result-text" style={{ color: currentMatchupResults?.totalEffectivenessColor }}>
                    {currentMatchupResults?.totalEffectivenessDescription}
                  </div>
                  {/* <p>Attack Multiplier: {currentMatchupResults?.totalEffectiveness}</p> */}
                  <div style={{ margin: 'auto', fontSize: '12px', color: '#222' }}>
                    <ul>
                      {((currentMatchupResults?.breakdown?.length || 0) > 1) && currentMatchupResults?.breakdown.map((result) => (
                        <li style={{ listStyleType: "none" }} key={result.defendingType.name}>
                          {result.defendingType.name}: x{result.effectiveness}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ fontSize: '10px' }}>
                    <a href="https://pokemondb.net/type" target="_blank" rel="noopener noreferrer">Is that really true?!</a>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div>
        {(!currentMatchup || showResults) ? (
          <button style={{ padding: '1em', width: '180px', color: 'white', backgroundColor: '#1E90FF' }} onClick={onNewMatchupClick}>
            New Matchup
          </button>
        ) : (
          // <button onClick={onShowResultsClick}>
          //   Show Results
          // </button>
          <>
            <div className="answer-buttons">
              {[0.25, 0.5, 1, 2, 4].map(value => (
                <AnswerButton effectivenessDetail={effectivenessDetails[value as Effectiveness]} key={value} />
              ))}
              <AnswerButton effectivenessDetail={effectivenessDetails[0]} />
            </div>
          </>
        )}

      </div>
      {/* Open in new tab */}

      <div style={{ marginTop: '40px', fontSize: '10px' }}>
        <span>{answersCorrectCount} / {questionsAnsweredCount} ({scorePercentage}%)</span>
      </div>
    </>
  )
}

export default App
