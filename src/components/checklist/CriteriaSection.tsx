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
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-1">
        {section.title}
      </p>
      <div className="flex flex-col gap-1.5" role="group" aria-label={section.title}>
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
