import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { effectivenessDetails, evaluateMatchup, getEffectivenessColor, getRandomMatchup, type Effectiveness, type EffectivenessDetail, type Matchup } from './data/weaknesses';
import { TypeIcon } from './helpers/type-icons';
import { useSettings } from './Settings';

function App() {
  const [currentMatchup, setCurrentMatchup] = useState<Matchup | undefined>();
  const settings = useSettings();
  const [showResults, setShowResults] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>(undefined);
  const [lastAnswerValue, setLastAnswerValue] = useState<Effectiveness | undefined>(undefined);
  const [answersCorrectCount, setAnswersCorrectCount] = useState(0);
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0);
  const scorePercentage = questionsAnsweredCount ? Math.round(answersCorrectCount / questionsAnsweredCount * 100) : 0;

  const scoreText = useMemo(() => {
    if (scorePercentage >= 90) return "Outstanding!";
    else if (scorePercentage >= 80) return "Great job!";
    else if (scorePercentage >= 70) return "You did ok!";
    else if (scorePercentage >= 60) return "Keep practicing!";
    else return "Better luck next time";
  }, [scorePercentage]);

  const scoreColor = useMemo(() => {
    if (scorePercentage >= 90) return '#48c78e';
    if (scorePercentage >= 80) return '#5b8af0';
    if (scorePercentage >= 70) return '#ffe08a';
    if (scorePercentage >= 60) return '#f4a723';
    return '#f14668';
  }, [scorePercentage]);

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
  }, [settings.numberOfQuestions, questionsAnsweredCount]);

  const [viewScore, setViewScore] = useState(false);

  const onResetClick = () => {
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setQuestionsAnsweredCount(0);
    setAnswersCorrectCount(0);
    setViewScore(false);
    setShowResults(false);
  };

  const onViewScoreClick = () => {
    setViewScore(true);
  };

  const onNewMatchupClick = () => {
    setShowResults(false);
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    const newMatchup = getRandomMatchup(2);
    setCurrentMatchup(newMatchup);
  };

  useEffect(() => {
    const newMatchup = getRandomMatchup(1);
    setCurrentMatchup(newMatchup);
  }, []);

  const checkAnswer = (userAnswer: Effectiveness) => {
    setLastAnswerValue(userAnswer);
    if (userAnswer === currentMatchupResults?.totalEffectiveness) {
      setLastAnswerCorrect(true);
      setQuestionsAnsweredCount(questionsAnsweredCount + 1);
      setAnswersCorrectCount(answersCorrectCount + 1);
    } else {
      setQuestionsAnsweredCount(questionsAnsweredCount + 1);
      setLastAnswerCorrect(false);
    }
    setShowResults(true);
  };

  const AnswerButton = ({ effectivenessDetail }: { effectivenessDetail: EffectivenessDetail }) => {
    const { value } = effectivenessDetail;
    const onClick = () => checkAnswer(value);

    let stateClass = '';
    if (showResults) {
      const isCorrectAnswer = value === currentMatchupResults?.totalEffectiveness;
      const isSelectedWrong = value === lastAnswerValue && !isCorrectAnswer;

      if (isCorrectAnswer) {
        stateClass = 'answer-correct';
      } else if (isSelectedWrong) {
        stateClass = 'answer-selected-wrong';
      } else {
        stateClass = 'answer-dimmed';
      }
    }

    return (
      <button
        className={`answer-button ${stateClass}`}
        style={{ backgroundColor: getEffectivenessColor(value) }}
        onClick={onClick}
        disabled={showResults}>
        {value}x
      </button>
    );
  };

  console.log("Render status: ", {
    questionsAnsweredCount,
    questionCount: settings.numberOfQuestions,
    answersCorrectCount,
    scorePercentage,
    currentMatchup,
    showResults,
    lastAnswerCorrect,
    lastAnswerValue,
    finished,
    viewScore,
  });

  const questionNumber = questionsAnsweredCount + (showResults ? 0 : 1);

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">Pokémon Type Quiz</h1>
        <p className="app-subtitle">Guess the damage multiplier for each type matchup</p>
      </header>

      {viewScore ? (
        <div className="score-view">
          <div className="score-percentage" style={{ color: scoreColor }}>{scorePercentage}%</div>
          <div className="score-tier-text">{scoreText}</div>
          <div className="score-detail">{answersCorrectCount} / {questionsAnsweredCount} correct</div>
          <button className="primary-button" onClick={onResetClick}>Try Again</button>
        </div>
      ) : (
        <>
          <div className="progress-area">
            <div className="progress-label">
              <span>
                {settings.numberOfQuestions
                  ? `Question ${questionNumber} / ${settings.numberOfQuestions}`
                  : `Question ${questionNumber}`}
              </span>
              <span>{scorePercentage}%</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{
                  width: settings.numberOfQuestions
                    ? `${(questionsAnsweredCount / settings.numberOfQuestions) * 100}%`
                    : `${scorePercentage}%`
                }}
              />
            </div>
          </div>

          {currentMatchup && (
            <div className="matchup-card">
              <div className="matchup-section">
                <div className="matchup-section-label">Attack Type</div>
                <div className="type-chip" style={{ backgroundColor: currentMatchup.attackingType.color }}>
                  <TypeIcon type={currentMatchup.attackingType.name} style={{ width: '1em', height: '1em' }} />
                  <div>{currentMatchup.attackingType.name}</div>
                </div>
              </div>

              <div className="matchup-divider">vs</div>

              <div className="matchup-section">
                <div className="matchup-section-label">
                  Defending Type{currentMatchup.defendingTypes.length > 1 ? 's' : ''}
                </div>
                {currentMatchup.defendingTypes.map(d => (
                  <div key={d.name} className="type-chip" style={{ backgroundColor: d.color }}>
                    <TypeIcon type={d.name} style={{ width: '1em', height: '1em' }} />
                    <div>{d.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="interaction-area">
            {currentMatchup ? (
              <>
                <div className="question-text">What is the damage multiplier for the attack?</div>

                <div className="answer-buttons">
                  {[0.25, 0.5, 1, 2, 4].map(value => (
                    <AnswerButton effectivenessDetail={effectivenessDetails[value as Effectiveness]} key={value} />
                  ))}
                </div>
                <div className="answer-buttons" style={{ marginTop: '0.5rem' }}>
                  <AnswerButton effectivenessDetail={effectivenessDetails[0 as Effectiveness]} key={0} />
                </div>

                {showResults && (
                  <div className="result-row">
                    <div className={`result-banner ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}>
                      <div className={`result-icon ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}>
                        {lastAnswerCorrect ? '✓' : '✗'}
                      </div>
                      <div className="result-details">
                        <div className="result-effectiveness" style={{ color: currentMatchupResults?.totalEffectivenessColor }}>
                          {currentMatchupResults?.totalEffectivenessDescription}
                        </div>
                        {resultsBreakdown && (
                          <div className="result-breakdown">{resultsBreakdown}</div>
                        )}
                        {!lastAnswerCorrect && (
                          <div className="result-link">
                            <a href="https://pokemondb.net/type" target="_blank" rel="noopener noreferrer">
                              Is that really true?!
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {!finished ? (
                      <button className="next-button" onClick={onNewMatchupClick}>
                        <span className="next-arrow">▶</span>
                        <span>Next</span>
                      </button>
                    ) : (
                      <button className="next-button" onClick={onViewScoreClick}>
                        <span className="next-arrow">✓</span>
                        <span>Score</span>
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <button className="primary-button" onClick={onNewMatchupClick}>Next Matchup</button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App
