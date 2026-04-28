import { useMemo, useState } from 'react';
import { getRadioGroupMembers } from '../data/checklistCriteria';
import { computeAllEligibilities } from '../data/eligibilityRules';
import type { CriterionKey, RadioGroupKey } from '../types/checklist';

export function useChecklist() {
  const [checked, setChecked] = useState<Set<CriterionKey>>(new Set());

  // Toggle simple (pour les checkboxes)
  const toggle = (key: CriterionKey) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Sélection exclusive (pour les radio groups) — reclique = décocher
  const selectRadio = (groupKey: RadioGroupKey, key: CriterionKey) => {
    const members = getRadioGroupMembers(groupKey);
    setChecked(prev => {
      const next = new Set(prev);
      members.forEach(k => next.delete(k));
      if (!prev.has(key)) next.add(key); // reclique sur le même → décocher
      return next;
    });
  };

  const reset = () => setChecked(new Set());

  const eligibilities = useMemo(() => computeAllEligibilities(checked), [checked]);

  const eligibleCount = eligibilities.filter(e => e.status === 'eligible').length;
  const partialCount = eligibilities.filter(e => e.status === 'partial').length;
  const unreachableCount = eligibilities.filter(e => e.status === 'unreachable').length;

  return {
    checked,
    toggle,
    selectRadio,
    reset,
    eligibilities,
    eligibleCount,
    partialCount,
    unreachableCount,
  };
}
