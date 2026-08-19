type ProgressBarProps = {
  questionNumber: number;
  totalQuestions: number;
  questionsAnsweredCount: number;
};

export function ProgressBar({
  questionNumber,
  totalQuestions,
  questionsAnsweredCount,
}: ProgressBarProps) {
  
    const percentage = Math.round(questionsAnsweredCount / totalQuestions * 100);
  return (
    <div className="progress-area">
      <div className="progress-label">
        <span>Question {questionNumber} / {totalQuestions}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
