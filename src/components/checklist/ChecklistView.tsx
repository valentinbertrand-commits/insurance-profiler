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

  const checkedCount = checked.size;

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 48px rgba(123,111,232,0.10)' }}
    >
      <div className="flex min-h-[600px]">
        {/* ── Colonne gauche : critères ── */}
        <div className="w-[400px] shrink-0 border-r border-gray-100 flex flex-col">
          {/* Header colonne */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Vos documents</p>
              <p className="text-xs text-gray-400 mt-0.5">Cochez les critères que vous possédez</p>
            </div>
            {checkedCount > 0 && (
              <button
                onClick={reset}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150 flex items-center gap-1 cursor-pointer"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Réinitialiser
              </button>
            )}
          </div>

          {/* Liste des critères */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
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

        {/* ── Colonne droite : résultats ── */}
        <div className="flex-1 flex flex-col">
          {/* Header colonne */}
          <div className="px-8 py-6 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Profils correspondants</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {checkedCount === 0
                ? 'Commencez à cocher des critères pour voir votre éligibilité'
                : 'Résultats mis à jour en temps réel'}
            </p>
          </div>

          {/* Board */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
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
