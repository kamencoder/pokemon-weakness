import { effectivenessValueDetailList, getEffectivenessColor } from '../data/weaknesses';

type HelpPanelProps = {
  onClose: () => void;
};

export function HelpPanel({ onClose }: HelpPanelProps) {
  return (
    <div className="help-panel">
      <button className="help-close" onClick={onClose} aria-label="Close">✕</button>
      {effectivenessValueDetailList.map(detail => (
        <div key={detail.value} className="help-row">
          <div className="help-badge" style={{ backgroundColor: getEffectivenessColor(detail.value) }}>
            {detail.buttonText}
          </div>
          <div>
            <span className="help-title">{detail.helpTitle}</span>
            <span className="help-desc">{detail.helpText}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
