import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { effectivenessDetails, evaluateMatchup, getEffectivenessColor, getRandomMatchup, type Effectiveness, type EffectivenessDetail, type Matchup } from './data/weaknesses';

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

  const AnswerButton = ({ effectivenessDetail}: { effectivenessDetail: EffectivenessDetail }) => {
    const onClick = () => checkAnswer(effectivenessDetail.value);
    return (
      <button
        style={{ width: "6em", height: "3em", backgroundColor: getEffectivenessColor(effectivenessDetail.value) }}
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
            <div style={{ fontSize: "24px", marginBottom: '32px', fontWeight: 'bolder' }}>
              <span>What is the damage multipier for the attack?</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', maxWidth: '480px', border: '2px solid #AAA', borderRadius: '16px', padding: '2em', margin: 'auto', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', gap: '1.5em', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Attack Type</div>
                <div>
                  <span style={{ fontSize: '24px', fontWeight: 'bolder', color: 'white', backgroundColor: `${currentMatchup.attackingType.color}`, padding: '0.5em', borderRadius: '20px' }}>{currentMatchup.attackingType.name}</span>
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', flex: 'fit' }}>Vs.</div>
              <div style={{ flex: 1, display: 'flex', gap: '1.5em', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Defending Types</div>
                <div >
                  {currentMatchup.defendingTypes.map(d => (
                    <span style={{ fontSize: '24px', fontWeight: 'bolder', color: 'white', backgroundColor: `${d.color}`, padding: '0.5em', borderRadius: '20px' }}>{d.name}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '40px' }}>
              {showResults && (
                <>
                  <div 
                    style={{fontSize: '36px', backgroundColor: lastAnswerCorrect ? 'green' : 'red', color: 'white', borderRadius: '1em', width: '1.5em', height: '1.5em', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}
                  >
                    {lastAnswerCorrect ? '✔' : '✘'}
                  </div>
                  <div style={{ color: `${currentMatchupResults?.totalEffectivenessColor}`, fontSize: '24px', fontWeight: 'bolder', margin: '20px' }}>{currentMatchupResults?.totalEffectivenessDescription}</div>
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
          <button onClick={onNewMatchupClick}>
            New Matchup
          </button>
        ) : (
          // <button onClick={onShowResultsClick}>
          //   Show Results
          // </button>
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
                {[0.25, 0.5, 1, 2, 4].map(value => (
                  <AnswerButton effectivenessDetail={effectivenessDetails[value as Effectiveness]} key={value} />
                ))}                
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
                <AnswerButton effectivenessDetail={effectivenessDetails[0]}/>
              </div>
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
