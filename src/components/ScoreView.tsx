import type { Mode } from '../Settings';

type ScoreViewProps = {
  scorePercentage: number;
  scoreColor: string;
  scoreImage: string;
  scoreText: string;
  answersCorrectCount: number;
  questionsAnsweredCount: number;
  mode: Mode;
  includeDualTypes: boolean;
  onReset: () => void;
  onTryMode: (mode: Mode) => void;
};

const nextMode: Partial<Record<Mode, Mode>> = {
  daily: 'random',
};

const modeLabel: Record<Mode, string> = {
  daily: 'Daily',
  random: 'Random',
};

const modeDisplayName: Record<Mode, string> = {
  daily: 'Daily Test',
  random: 'Random Test',
};

export function ScoreView({
  scorePercentage,
  scoreColor,
  scoreImage,
  scoreText,
  answersCorrectCount,
  questionsAnsweredCount,
  mode,
  includeDualTypes,
  onReset,
  onTryMode,
}: ScoreViewProps) {
  const next = nextMode[mode];

  return (
    <div className="score-view">
      <div className="score-percentage" style={{ color: scoreColor }}>{scorePercentage}%</div>
      <img src={scoreImage} className="score-image" alt="" />
      <div className="score-tier-text">{scoreText}</div>
      <div className="score-detail">{answersCorrectCount} / {questionsAnsweredCount} correct</div>
      <button className="primary-button" onClick={onReset}>Try Again</button>
      {next && (
        <button className="primary-button" onClick={() => onTryMode(next)}>
          Try {modeLabel[next]}
        </button>
      )}
      {mode === 'daily' && (
        <p className="score-did-you-know">Come back tomorrow for a new daily challenge!</p>
      )}
      {mode === 'random' && (
        <p className="score-did-you-know">
          Did you know? There are{' '}
          <strong>{includeDualTypes ? '3,078' : '324'}</strong>{' '}
          possible type matchups{includeDualTypes ? ' when including both single and dual type pokemon' : ' for single type pokemon'}.
        </p>
      )}
    </div>
  );
}
