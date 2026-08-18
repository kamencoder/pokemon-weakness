type ScoreViewProps = {
  scorePercentage: number;
  scoreColor: string;
  scoreImage: string;
  scoreText: string;
  answersCorrectCount: number;
  questionsAnsweredCount: number;
  includeDualTypes: boolean;
  onReset: () => void;
};

export function ScoreView({
  scorePercentage,
  scoreColor,
  scoreImage,
  scoreText,
  answersCorrectCount,
  questionsAnsweredCount,
  includeDualTypes,
  onReset,
}: ScoreViewProps) {
  return (
    <div className="score-view">
      <div className="score-percentage" style={{ color: scoreColor }}>{scorePercentage}%</div>
      <img src={scoreImage} className="score-image" alt="" />
      <div className="score-tier-text">{scoreText}</div>
      <div className="score-detail">{answersCorrectCount} / {questionsAnsweredCount} correct</div>
      <button className="primary-button" onClick={onReset}>Try Again</button>
      <p className="score-did-you-know">
        Did you know? There are{' '}
        <strong>{includeDualTypes ? '3,078' : '324'}</strong>{' '}
        possible type matchups{includeDualTypes ? ' when including both single and dual type pokemon' : ' for single type pokemon'}.
      </p>
    </div>
  );
}
