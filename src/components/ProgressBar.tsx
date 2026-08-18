type ProgressBarProps = {
  questionNumber: number;
  totalQuestions: number;
  questionsAnsweredCount: number;
  scorePercentage: number;
};

export function ProgressBar({
  questionNumber,
  totalQuestions,
  questionsAnsweredCount,
  scorePercentage,
}: ProgressBarProps) {
  return (
    <div className="progress-area">
      <div className="progress-label">
        <span>Question {questionNumber} / {totalQuestions}</span>
        <span>{scorePercentage}%</span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${(questionsAnsweredCount / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
}
