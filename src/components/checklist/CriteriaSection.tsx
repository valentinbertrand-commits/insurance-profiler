import type { CriteriaSection as CriteriaSectionType, CriterionKey, RadioGroupKey } from '../../types/checklist';
import { CriteriaItem } from './CriteriaItem';

interface Props {
  section: CriteriaSectionType;
  checked: Set<CriterionKey>;
  onChange: (key: CriterionKey, radioGroup?: RadioGroupKey) => void;
}

export function CriteriaSection({ section, checked, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <span className="w-1 h-3 rounded-full bg-[#C4BEFF] inline-block" />
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
          {section.title}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        {section.criteria.map(criterion => (
          <CriteriaItem
            key={criterion.key}
            criterion={criterion}
            isChecked={checked.has(criterion.key)}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}
