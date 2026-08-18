type ResultBannerProps = {
  lastAnswerCorrect: boolean;
  totalEffectivenessDescription: string | undefined;
  resultsBreakdown: string;
  finished: boolean;
  onNext: () => void;
  onViewScore: () => void;
};

export function ResultBanner({
  lastAnswerCorrect,
  totalEffectivenessDescription,
  resultsBreakdown,
  finished,
  onNext,
  onViewScore,
}: ResultBannerProps) {
  return (
    <div className="result-row">
      <div className={`result-banner ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}>
        <div className={`result-icon ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}>
          {lastAnswerCorrect ? '✓' : '✗'}
        </div>
        <div className="result-details">
          <div className="result-effectiveness" style={{ color: 'white' }}>
            It's {totalEffectivenessDescription}
          </div>
          {resultsBreakdown && (
            <div className="result-breakdown">
              {resultsBreakdown}
              <a
                className="result-breakdown-link"
                href="https://pokemondb.net/type"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Verify on PokemonDB"
              >
                <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="9"/>
                  <text x="10" y="14" textAnchor="middle" fontSize="11" fontWeight="700" stroke="none" fill="currentColor">?</text>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
      {!finished ? (
        <button className="next-button" onClick={onNext}>
          <span className="next-arrow">▶</span>
          <span>Next</span>
        </button>
      ) : (
        <button className="next-button" onClick={onViewScore}>
          <span className="next-arrow">✓</span>
          <span>Score</span>
        </button>
      )}
    </div>
  );
}
