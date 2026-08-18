import { TypeIcon } from '../helpers/type-icons';
import type { Matchup } from '../data/weaknesses';

type MatchupCardProps = {
  matchup: Matchup;
};

export function MatchupCard({ matchup }: MatchupCardProps) {
  return (
    <div className="matchup-card">
      <div className="matchup-section">
        <div className="matchup-section-label">Attack Type</div>
        <div className="type-chip" style={{ backgroundColor: matchup.attackingType.color }}>
          <TypeIcon type={matchup.attackingType.name} style={{ width: '1em', height: '1em' }} />
          <div>{matchup.attackingType.name}</div>
        </div>
      </div>

      <div className="matchup-divider">vs</div>

      <div className="matchup-section">
        <div className="matchup-section-label">
          Defending Type{matchup.defendingTypes.length > 1 ? 's' : ''}
        </div>
        {matchup.defendingTypes.map(d => (
          <div key={d.name} className="type-chip" style={{ backgroundColor: d.color }}>
            <TypeIcon type={d.name} style={{ width: '1em', height: '1em' }} />
            <div>{d.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
