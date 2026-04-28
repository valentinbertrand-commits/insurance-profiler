import type { CriterionDefinition, CriterionKey, RadioGroupKey } from '../../types/checklist';

interface Props {
  criterion: CriterionDefinition;
  isChecked: boolean;
  onChange: (key: CriterionKey, radioGroup?: RadioGroupKey) => void;
}

export function CriteriaItem({ criterion, isChecked, onChange }: Props) {
  const isRadio = !!criterion.radioGroup;

  return (
    <button
      role={isRadio ? 'radio' : 'checkbox'}
      aria-checked={isChecked}
      onClick={() => onChange(criterion.key, criterion.radioGroup)}
      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 cursor-pointer
        ${isChecked
          ? 'border-[#7B6FE8] bg-[#F5F3FF]'
          : 'border-gray-200 bg-white hover:border-[#C4BEFF] hover:bg-gray-50/80'
        }`}
    >
      {/* Indicateur visuel */}
      <span className={`shrink-0 flex items-center justify-center transition-all duration-150
        ${isRadio ? 'w-4 h-4 rounded-full border-2' : 'w-4 h-4 rounded-[5px] border-2'}
        ${isChecked ? 'border-[#7B6FE8] bg-[#7B6FE8]' : 'border-gray-300 bg-white'}`}
      >
        {isChecked && (
          isRadio
            ? <span className="w-1.5 h-1.5 rounded-full bg-white block" />
            : <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
        )}
      </span>

      {/* Texte */}
      <span className="flex-1">
        <span className={`block text-sm leading-snug transition-colors duration-150
          ${isChecked ? 'text-[#4C3DB5] font-medium' : 'text-gray-700 font-normal'}`}
        >
          {criterion.label}
        </span>
        {criterion.hint && (
          <span className="block text-xs text-gray-400 mt-0.5 leading-relaxed">{criterion.hint}</span>
        )}
      </span>
    </button>
  );
}
