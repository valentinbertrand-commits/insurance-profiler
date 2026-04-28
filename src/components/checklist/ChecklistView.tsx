import { CRITERIA_SECTIONS } from '../../data/checklistCriteria';
import { useChecklist } from '../../hooks/useChecklist';
import type { CriterionKey, RadioGroupKey } from '../../types/checklist';
import { EligibilityBoard } from './EligibilityBoard';
import { CriteriaSection } from './CriteriaSection';

export function ChecklistView() {
  const { checked, toggle, selectRadio, reset, eligibilities, eligibleCount, partialCount, unreachableCount } =
    useChecklist();

  const handleChange = (key: CriterionKey, radioGroup?: RadioGroupKey) => {
    if (radioGroup) {
      selectRadio(radioGroup, key);
    } else {
      toggle(key);
    }
  };

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden flex-1 flex flex-col"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 48px rgba(123,111,232,0.10)' }}
    >
      <div className="flex flex-1 gap-[120px]">

        {/* ── Colonne gauche : critères ────────────────────────────────────── */}
        <div className="w-[300px] shrink-0 bg-[#F7F7FB] rounded-2xl flex flex-col">
          {/* En-tête */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-900">Vos critères</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Cochez tout ce que vous possédez
                </p>
              </div>
              {checked.size > 0 && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#7B6FE8] transition-colors duration-150 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Réinitialiser
                </button>
              )}
            </div>
            {/* Compteur de critères cochés */}
            {checked.size > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((checked.size / 19) * 100, 100)}%`, backgroundColor: '#7B6FE8' }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#7B6FE8]">{checked.size} / 19</span>
              </div>
            )}
          </div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
            {CRITERIA_SECTIONS.map(section => (
              <CriteriaSection
                key={section.id}
                section={section}
                checked={checked}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        {/* ── Colonne droite : résultats ───────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* En-tête */}
          <div className="px-10 py-5 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-900">Profils correspondants</p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {checked.size === 0
                ? 'Commencez à cocher des critères pour voir votre éligibilité'
                : 'Mis à jour en temps réel'}
            </p>
          </div>

          {/* Board */}
          <div className="flex-1 overflow-y-auto px-10 py-7">
            <EligibilityBoard
              eligibilities={eligibilities}
              eligibleCount={eligibleCount}
              partialCount={partialCount}
              unreachableCount={unreachableCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
