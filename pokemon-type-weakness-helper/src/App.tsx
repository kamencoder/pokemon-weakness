import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { evaluateMatchup, getRandomMatchup, getEffectivenessDescription, type Matchup } from './data/weaknesses';

function App() {
  const [currentMatchup, setCurrentMatchup] = useState<Matchup | undefined>();
  const [showResults, setShowResults] = useState(false);
  const currentMatchupResults = useMemo(() => {
    if (!currentMatchup) {
      console.log('No matchup set!');
      return undefined;
    }
    const matchupResults = evaluateMatchup(currentMatchup);
    return matchupResults;
  }, [currentMatchup]);
  const onNewMatchupClick = () => {
    setShowResults(false);
    const newMatchup = getRandomMatchup(2);
    setCurrentMatchup(newMatchup);
  }

  const onShowResultsClick = () => {
    setShowResults(true);
  }

  useEffect(() => {
    const newMatchup = getRandomMatchup(1);
    setCurrentMatchup(newMatchup);
  }, [])

  return (
    <>
      <h1>Pokemon Type Matchup Test</h1>
      <div className="card">
        {currentMatchup && (
          <>
            <div style={{ display: 'flex', gap: '10px', maxWidth: '480px', border: '1px solid black', margin: 'auto', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Attack Type</div>
                <div style={{ fontSize: '24px', fontWeight: 'bolder' }}>{currentMatchup.attackingType}</div>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', flex: 'fit' }}>Vs.</div>
              <div style={{ flex: 1, display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Defending Types</div>
                <div style={{ fontSize: '24px', fontWeight: 'bolder' }}>{currentMatchup.defendingTypes.join(', ')}</div>
              </div>
            </div>
            <div style={{ minHeight: "300px" }}>
              {showResults && (
                <>
                  <h3>{getEffectivenessDescription(currentMatchupResults?.totalEffectiveness)}</h3>
                  {/* <p>Attack Multiplier: {currentMatchupResults?.totalEffectiveness}</p> */}
                  <div style={{ margin: 'auto', fontSize: '12px', color: '#222'}}>
                    <div>Details</div>
                    <ul>
                      {currentMatchupResults?.breakdown.map((result) => (
                        <li style={{listStyleType: "none"}} key={result.defendingType}>
                          {result.defendingType}: x{result.effectiveness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div>
        {(!currentMatchup || showResults) ? (
          <button onClick={onNewMatchupClick}>
            New Matchup
          </button>
        ) : (
          <button onClick={onShowResultsClick}>
            Show Results
          </button>
        )}

      </div>
      {/* Open in new tab */}
      <div style={{ marginTop: '40px', fontSize: '10px' }}>
        <a href="https://pokemondb.net/type" target="_blank" rel="noopener noreferrer">Is this right?</a>
      </div>
    </>
  )
}

export default App
