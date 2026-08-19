import { useMemo, useState } from 'react'
import posthog from 'posthog-js'
import './App.css'
import { effectivenessDetails, evaluateMatchup, getRandomMatchup, type Effectiveness, type Matchup } from './data/weaknesses';
import { getDailyMatchups } from './data/weaknesses';
import { getInitialSettings, type Settings, type Mode } from './Settings';

import smileImg from './assets/results/smile.svg';
import neutralImg from './assets/results/nuetral.svg';
import frownImg from './assets/results/frown.svg';

import { Header } from './components/Header';
import { SettingsPanel } from './components/SettingsPanel';
import { ProgressBar } from './components/ProgressBar';
import { MatchupCard } from './components/MatchupCard';
import { AnswerButton } from './components/AnswerButton';
import { HelpPanel } from './components/HelpPanel';
import { ResultBanner } from './components/ResultBanner';
import { ScoreView } from './components/ScoreView';

const DAILY_QUESTION_COUNT = 20;

function buildMatchupQueue(s: Settings): Matchup[] {
  if (s.mode === 'daily') return getDailyMatchups(DAILY_QUESTION_COUNT);
return Array.from({ length: s.numberOfQuestions }, () =>
    getRandomMatchup(s.includeDualTypes ? 2 : 1)
  );
}

const initialSettings = getInitialSettings();

function App() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [matchupQueue, setMatchupQueue] = useState<Matchup[]>(() => buildMatchupQueue(initialSettings));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersCorrectCount, setAnswersCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>(undefined);
  const [lastAnswerValue, setLastAnswerValue] = useState<Effectiveness | undefined>(undefined);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pendingSettings, setPendingSettings] = useState<Settings>(initialSettings);
  const [viewScore, setViewScore] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const currentMatchup = matchupQueue[currentIndex];
  const totalQuestions = matchupQueue.length;
  const questionsAnsweredCount = currentIndex + (showResults ? 1 : 0);
  const finished = showResults && currentIndex >= matchupQueue.length - 1;

  const scorePercentage = questionsAnsweredCount
    ? Math.round(answersCorrectCount / questionsAnsweredCount * 100)
    : 0;

  const scoreText = useMemo(() => {
    if (scorePercentage >= 90) return "Outstanding!";
    if (scorePercentage >= 80) return "Great job!";
    if (scorePercentage >= 70) return "You did ok!";
    if (scorePercentage >= 60) return "Keep practicing!";
    return "Better luck next time";
  }, [scorePercentage]);

  const scoreImage = useMemo(() => {
    if (scorePercentage >= 80) return smileImg;
    if (scorePercentage >= 60) return neutralImg;
    return frownImg;
  }, [scorePercentage]);

  const scoreColor = useMemo(() => {
    if (scorePercentage >= 90) return '#48c78e';
    if (scorePercentage >= 80) return '#5b8af0';
    if (scorePercentage >= 70) return '#ffe08a';
    if (scorePercentage >= 60) return '#f4a723';
    return '#f14668';
  }, [scorePercentage]);

  const currentMatchupResults = useMemo(() => {
    if (!currentMatchup) return undefined;
    return evaluateMatchup(currentMatchup);
  }, [currentMatchup]);

  const resultsBreakdown = useMemo(() => {
    if ((currentMatchupResults?.breakdown?.length || 0) < 1) return "";
    return currentMatchupResults!.breakdown
      .map(result => `${result.defendingType.name}: x${result.effectiveness}`)
      .join(", ");
  }, [currentMatchupResults]);

  const settingsDirty =
    pendingSettings.numberOfQuestions !== settings.numberOfQuestions ||
    pendingSettings.includeDualTypes !== settings.includeDualTypes ||
    pendingSettings.mode !== settings.mode;

  // Always show 0.25x and 4x buttons for curated modes (where they can appear);
  // for random mode, hide them when dual types are disabled.
  const showAllMultiplierButtons = settings.mode !== 'random' || settings.includeDualTypes;

  const resetQuiz = (s: Settings) => {
    const queue = buildMatchupQueue(s);
    setMatchupQueue(queue);
    setCurrentIndex(0);
    setAnswersCorrectCount(0);
    setShowResults(false);
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setViewScore(false);
  };

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
    resetQuiz(pendingSettings);
  };

  const onNewMatchupClick = () => {
    setShowResults(false);
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setCurrentIndex(i => i + 1);
  };

  const onTryMode = (mode: Mode) => {
    const newSettings = { ...settings, mode };
    setSettings(newSettings);
    setPendingSettings(newSettings);
    resetQuiz(newSettings);
  };

  const checkAnswer = (userAnswer: Effectiveness) => {
    setLastAnswerValue(userAnswer);
    const correct = userAnswer === currentMatchupResults?.totalEffectiveness;
    setLastAnswerCorrect(correct);
    if (correct) setAnswersCorrectCount(a => a + 1);
    setShowResults(true);

    const defending = currentMatchup!.defendingTypes.map(d => d.name).join('/');
    posthog.capture('matchup_answered', {
      matchup: `${currentMatchup!.attackingType.name} vs ${defending}`,
      attacking_type: currentMatchup!.attackingType.name,
      defending_types: defending,
      correct_answer: currentMatchupResults?.totalEffectiveness,
      user_answer: userAnswer,
      correct,
      mode: settings.mode,
    });
  };

  return (
    <>
      <Header mode={settings.mode} onSettingsClick={toggleSettings} />

      {settingsOpen && (
        <SettingsPanel
          pendingSettings={pendingSettings}
          setPendingSettings={setPendingSettings}
          settingsDirty={settingsDirty}
          onCancel={cancelSettings}
          onSave={saveSettings}
        />
      )}

      {viewScore ? (
        <ScoreView
          scorePercentage={scorePercentage}
          scoreColor={scoreColor}
          scoreImage={scoreImage}
          scoreText={scoreText}
          answersCorrectCount={answersCorrectCount}
          questionsAnsweredCount={questionsAnsweredCount}
          mode={settings.mode}
          includeDualTypes={settings.includeDualTypes}
          onReset={() => resetQuiz(settings)}
          onTryMode={onTryMode}
        />
      ) : (
        <>
          <ProgressBar
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            questionsAnsweredCount={questionsAnsweredCount}
            scorePercentage={scorePercentage}
          />

          {currentMatchup && <MatchupCard matchup={currentMatchup} />}

          <div className="interaction-area">
            {currentMatchup ? (
              <>
                <div className="question-row">
                  <div className="question-text">What is the damage multiplier for the attack?</div>
                  <button
                    className={`help-trigger${showHelp ? ' active' : ''}`}
                    onClick={() => setShowHelp(h => !h)}
                    aria-label="Explain multipliers"
                  >
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="10" cy="10" r="9"/>
                      <text x="10" y="14" textAnchor="middle" fontSize="11" fontWeight="700" stroke="none" fill="currentColor">?</text>
                    </svg>
                  </button>
                </div>

                {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}

                <div className="answer-buttons">
                  {[0.25, 0.5, 1, 2, 4].map(value => (
                    <AnswerButton
                      key={value}
                      effectivenessDetail={effectivenessDetails[value as Effectiveness]}
                      showResults={showResults}
                      includeDualTypes={showAllMultiplierButtons}
                      correctAnswer={currentMatchupResults?.totalEffectiveness}
                      lastAnswerValue={lastAnswerValue}
                      onAnswer={checkAnswer}
                    />
                  ))}
                </div>
                <div className="answer-buttons answer-buttons-immune" style={{ marginTop: '1rem' }}>
                  <AnswerButton
                    key={0}
                    effectivenessDetail={effectivenessDetails[0 as Effectiveness]}
                    showResults={showResults}
                    includeDualTypes={showAllMultiplierButtons}
                    correctAnswer={currentMatchupResults?.totalEffectiveness}
                    lastAnswerValue={lastAnswerValue}
                    onAnswer={checkAnswer}
                  />
                </div>

                {showResults && (
                  <ResultBanner
                    lastAnswerCorrect={lastAnswerCorrect!}
                    totalEffectivenessDescription={currentMatchupResults?.totalEffectivenessDescription}
                    resultsBreakdown={resultsBreakdown}
                    finished={finished}
                    onNext={onNewMatchupClick}
                    onViewScore={() => setViewScore(true)}
                  />
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
