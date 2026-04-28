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
      <div className="pb-1.5 border-b border-gray-200">
        <p className="text-xs font-bold text-gray-900">
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
