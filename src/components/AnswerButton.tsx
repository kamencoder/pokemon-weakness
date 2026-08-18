import { getEffectivenessColor, type Effectiveness, type EffectivenessDetail } from '../data/weaknesses';

type AnswerButtonProps = {
  effectivenessDetail: EffectivenessDetail;
  showResults: boolean;
  includeDualTypes: boolean;
  correctAnswer: Effectiveness | undefined;
  lastAnswerValue: Effectiveness | undefined;
  onAnswer: (value: Effectiveness) => void;
};

export function AnswerButton({
  effectivenessDetail,
  showResults,
  includeDualTypes,
  correctAnswer,
  lastAnswerValue,
  onAnswer,
}: AnswerButtonProps) {
  const { value, buttonText } = effectivenessDetail;

  if (!includeDualTypes && (value === 0.25 || value === 4)) {
    return null;
  }

  let stateClass = '';
  if (showResults) {
    const isCorrectAnswer = value === correctAnswer;
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
      onClick={() => onAnswer(value)}
      disabled={showResults}
    >
      {buttonText}
    </button>
  );
}
