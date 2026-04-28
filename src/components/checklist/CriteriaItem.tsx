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
      className={`w-full text-left flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150 cursor-pointer group
        ${isChecked
          ? 'border-[#7B6FE8] bg-[#F5F3FF]'
          : 'border-gray-200 bg-white hover:border-[#7B6FE8]/40 hover:bg-gray-50'
        }`}
    >
      {/* Indicator */}
      <span
        className={`mt-0.5 shrink-0 flex items-center justify-center transition-all duration-150
          ${isRadio ? 'w-4 h-4 rounded-full border-2' : 'w-4 h-4 rounded border-2'}
          ${isChecked
            ? 'border-[#7B6FE8] bg-[#7B6FE8]'
            : 'border-gray-300 bg-white group-hover:border-[#7B6FE8]/60'
          }`}
      >
        {isChecked && (
          isRadio ? (
            <span className="w-1.5 h-1.5 rounded-full bg-white block" />
          ) : (
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )
        )}
      </span>

      {/* Label */}
      <span className="flex-1 flex flex-col gap-0.5">
        <span className={`text-sm font-medium leading-snug transition-colors duration-150
          ${isChecked ? 'text-[#4C3DB5]' : 'text-gray-700'}`}
        >
          {criterion.label}
        </span>
        {criterion.hint && (
          <span className="text-xs text-gray-400 leading-relaxed">{criterion.hint}</span>
        )}
      </span>
    </button>
  );
}
