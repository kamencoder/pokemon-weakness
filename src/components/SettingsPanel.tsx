import type { Settings } from '../Settings';

type SettingsPanelProps = {
  pendingSettings: Settings;
  setPendingSettings: React.Dispatch<React.SetStateAction<Settings>>;
  settingsDirty: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export function SettingsPanel({
  pendingSettings,
  setPendingSettings,
  settingsDirty,
  onCancel,
  onSave,
}: SettingsPanelProps) {
  return (
    <div className="settings-panel">
      <div className="settings-group">
        <span className="settings-label">Quiz Length</span>
        <div className="settings-options">
          {[10, 20, 50, 100].map(n => (
            <button
              key={n}
              className={`settings-option${pendingSettings.numberOfQuestions === n ? ' active' : ''}`}
              onClick={() => setPendingSettings(s => ({ ...s, numberOfQuestions: n }))}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="settings-group">
        <span className="settings-label">Dual Types</span>
        <div className="settings-options">
          <button
            className={`settings-option${pendingSettings.includeDualTypes ? ' active' : ''}`}
            onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: true }))}
          >
            On
          </button>
          <button
            className={`settings-option${!pendingSettings.includeDualTypes ? ' active' : ''}`}
            onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: false }))}
          >
            Off
          </button>
        </div>
      </div>
      {settingsDirty && (
        <>
          <p className="settings-warning">Saving will restart the current quiz.</p>
          <div className="settings-actions">
            <button className="settings-cancel" onClick={onCancel}>Cancel</button>
            <button className="settings-save" onClick={onSave}>Save & Restart</button>
          </div>
        </>
      )}
    </div>
  );
}
