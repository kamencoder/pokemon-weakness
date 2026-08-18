import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { effectivenessDetails, evaluateMatchup, getEffectivenessColor, getRandomMatchup, type Effectiveness, type EffectivenessDetail, type Matchup } from './data/weaknesses';
import { TypeIcon } from './helpers/type-icons';
import { defaultSettings, type Settings } from './Settings';
import smileImg from './assets/results/smile.svg';
import neutralImg from './assets/results/nuetral.svg';
import frownImg from './assets/results/frown.svg';

function App() {
  const [currentMatchup, setCurrentMatchup] = useState<Matchup | undefined>();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pendingSettings, setPendingSettings] = useState<Settings>(defaultSettings);
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

  const scoreImage = useMemo(() => {
    if (scorePercentage >= 80) return smileImg;
    else if (scorePercentage >= 60) return neutralImg;
    else return frownImg;
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
    return evaluateMatchup(currentMatchup);
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
    return questionsAnsweredCount >= settings.numberOfQuestions;
  }, [settings.numberOfQuestions, questionsAnsweredCount]);

  const settingsDirty =
    pendingSettings.numberOfQuestions !== settings.numberOfQuestions ||
    pendingSettings.includeDualTypes !== settings.includeDualTypes;

  const [viewScore, setViewScore] = useState(false);

  const toggleSettings = () => {
    setPendingSettings(settings);
    setSettingsOpen(s => !s);
  };

  const cancelSettings = () => {
    setPendingSettings(settings);
    setSettingsOpen(false);
  };

  const saveSettings = () => {
    setSettings(pendingSettings);
    setSettingsOpen(false);
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setQuestionsAnsweredCount(0);
    setAnswersCorrectCount(0);
    setViewScore(false);
    setShowResults(false);
    setCurrentMatchup(getRandomMatchup(pendingSettings.includeDualTypes ? 2 : 1));
  };

  const onResetClick = () => {
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setQuestionsAnsweredCount(0);
    setAnswersCorrectCount(0);
    setViewScore(false);
    setShowResults(false);
    setCurrentMatchup(getRandomMatchup(settings.includeDualTypes ? 2 : 1));
  };

  const onViewScoreClick = () => {
    setViewScore(true);
  };

  const onNewMatchupClick = () => {
    setShowResults(false);
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setCurrentMatchup(getRandomMatchup(settings.includeDualTypes ? 2 : 1));
  };

  useEffect(() => {
    setCurrentMatchup(getRandomMatchup(settings.includeDualTypes ? 2 : 1));
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
    const { value, buttonText } = effectivenessDetail;
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
          {/* {value}x */}
          {buttonText}
      </button>
    );
  };

  const questionNumber = questionsAnsweredCount + (showResults ? 0 : 1);

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">Pokémon Type Quiz</h1>
        <p className="app-subtitle">Guess the damage multiplier for each type matchup</p>
        <button className="settings-trigger" onClick={toggleSettings} aria-label="Settings">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </button>
      </header>

      {settingsOpen && (
        <div className="settings-panel">
          <div className="settings-group">
            <span className="settings-label">Quiz Length</span>
            <div className="settings-options">
              {[10, 20, 50, 100].map(n => (
                <button
                  key={n}
                  className={`settings-option${pendingSettings.numberOfQuestions === n ? ' active' : ''}`}
                  onClick={() => setPendingSettings(s => ({ ...s, numberOfQuestions: n }))}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="settings-group">
            <span className="settings-label">Dual Types</span>
            <div className="settings-options">
              <button
                className={`settings-option${pendingSettings.includeDualTypes ? ' active' : ''}`}
                onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: true }))}
              >
                On
              </button>
              <button
                className={`settings-option${!pendingSettings.includeDualTypes ? ' active' : ''}`}
                onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: false }))}
              >
                Off
              </button>
            </div>
          </div>
          {settingsDirty && (
            <>
              <p className="settings-warning">Saving will restart the current quiz.</p>
              <div className="settings-actions">
                <button className="settings-cancel" onClick={cancelSettings}>Cancel</button>
                <button className="settings-save" onClick={saveSettings}>Save & Restart</button>
              </div>
            </>
          )}
        </div>
      )}

      {viewScore ? (
        <div className="score-view">
          <div className="score-percentage" style={{ color: scoreColor }}>{scorePercentage}%</div>
          <img src={scoreImage} className="score-image" alt="" />
          <div className="score-tier-text">{scoreText}</div>
          <div className="score-detail">{answersCorrectCount} / {questionsAnsweredCount} correct</div>
          <button className="primary-button" onClick={onResetClick}>Try Again</button>
        </div>
      ) : (
        <>
          <div className="progress-area">
            <div className="progress-label">
              <span>Question {questionNumber} / {settings.numberOfQuestions}</span>
              <span>{scorePercentage}%</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${(questionsAnsweredCount / settings.numberOfQuestions) * 100}%` }}
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
                <div className="answer-buttons" style={{ marginTop: '1rem' }}>
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
