import { use, useEffect, useMemo, useState } from 'react'
import './App.css'
import { effectivenessDetails, evaluateMatchup, getEffectivenessColor, getRandomMatchup, type Effectiveness, type EffectivenessDetail, type Matchup } from './data/weaknesses';
import { TypeIcon } from './helpers/type-icons';
import { useSettings } from './Settings';

function App() {
  const [currentMatchup, setCurrentMatchup] = useState<Matchup | undefined>();
  const settings = useSettings();
  const [showResults, setShowResults] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>(undefined);
  const [answersCorrectCount, setAnswersCorrectCount] = useState(0);
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0);
  const scorePercentage = questionsAnsweredCount ? Math.round(answersCorrectCount / questionsAnsweredCount * 100) : 0;
  const scoreText = useMemo(() => {
    if (scorePercentage >= 90) {
      return "Outstanding!";
    } else if (scorePercentage >= 80){
      return "Great job!"
    } else if (scorePercentage >= 70){
      return "You did ok!"
    } else if (scorePercentage >= 60){
      return "Keep practicing!"
    } else if (scorePercentage < 60){
      return "Better luck next time :("
    }
  }, [scorePercentage])

  const currentMatchupResults = useMemo(() => {
    if (!currentMatchup) {
      console.log('No matchup set!');
      return undefined;
    }
    const matchupResults = evaluateMatchup(currentMatchup);
    return matchupResults;
  }, [currentMatchup]);
  const resultsBreakdown = useMemo(() => {
    if ((currentMatchupResults?.breakdown?.length || 0) < 1) {
      return "";
    }
    return currentMatchupResults?.breakdown
      .map(result => `${result.defendingType.name}: x${result.effectiveness}`)
      .join(", ");
  }, [currentMatchupResults]);

  const finished = useMemo(() => {
    if (!settings.numberOfQuestions) {
      return false;
    } else {
      return questionsAnsweredCount >= settings.numberOfQuestions;
    }
  }, [settings.numberOfQuestions, questionsAnsweredCount])
  const [viewScore, setViewScore] = useState(false);

  const onResetClick = () => {
    setLastAnswerCorrect(undefined);
    setQuestionsAnsweredCount(0);
    setAnswersCorrectCount(0);
    setViewScore(false);
    setShowResults(false);
  }

  const onViewScoreClick = () => {
    setViewScore(true);
  }

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


  console.log("Render status: ", {
    questionsAnsweredCount,
    questionCount: settings.numberOfQuestions,
    answersCorrectCount,
    scorePercentage,
    currentMatchup,
    showResults,
    lastAnswerCorrect,
    finished,
    viewScore,
  })

  if (viewScore) {
    console.log("showing view score screen");
    return (
      <>
        <h2>{scoreText}</h2>
        <div>Your Score: {scorePercentage}% ({answersCorrectCount}/{questionsAnsweredCount})</div>
        <button className="primary-button" onClick={onResetClick}>
          Try again
        </button>
      </>
    )
  }

  return (
    <>
      {/* <h1>Pokemon Type Weakness Test</h1> */}
      <div className="card">
        {currentMatchup && (
          <>
            <div className="matchup-container">
              <div className="matchup-section">
                <div className="matchup-section-text">Attack Type</div>
                <div className="matchup-type-container" style={{ backgroundColor: currentMatchup.attackingType.color }}>
                  <div><TypeIcon type={currentMatchup.attackingType.name} style={{ width: '1em', height: '1em' }} /></div>
                  <div>{currentMatchup.attackingType.name}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '3em' }}>Vs.</div>
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
                  <div style={{ fontSize: '12px' }}>
                    {resultsBreakdown}
                  </div>
                  {!lastAnswerCorrect && (
                    <div style={{ fontSize: '10px' }}>
                      <a href="https://pokemondb.net/type" target="_blank" rel="noopener noreferrer">Is that really true?!</a>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div>
        {(!currentMatchup || showResults) ?
          !finished ? (
            <button className="primary-button" onClick={onNewMatchupClick}>
              New Matchup
            </button>
          ) : (
            <button className="primary-button" onClick={onViewScoreClick}>
              View Score
            </button>
          )
          : (
            <>
              <div className="question-text">
                <span>What is the damage multiplier for the attack?</span>
              </div>
              <div className="answer-buttons">
                {[0.25, 0.5, 1, 2, 4].map(value => (
                  <AnswerButton effectivenessDetail={effectivenessDetails[value as Effectiveness]} key={value} />
                ))}
                <AnswerButton effectivenessDetail={effectivenessDetails[0]} />
              </div>
            </>
          )}

      </div>
      {!showResults && <div style={{ marginTop: '40px', fontSize: '10px' }}>
        {settings.numberOfQuestions ? (
          <span>Question {questionsAnsweredCount + 1} / {settings.numberOfQuestions}</span>
        ) : (
          <span>Question {questionsAnsweredCount + 1} / ♾️ - Score: {scorePercentage}%</span>
        )}

      </div>
      }
    </>
  )
}

export default App
