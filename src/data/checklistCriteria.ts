import type { CriteriaSection, CriterionDefinition, CriterionKey, RadioGroupKey } from '../types/checklist';

export const CRITERIA_SECTIONS: CriteriaSection[] = [
  {
    id: 'ca',
    title: 'Chiffre d\'affaires',
    criteria: [
      {
        key: 'ca_gt_1m',
        label: 'CA annuel supérieur à 1 000 000 €',
        radioGroup: 'ca_bracket',
      },
      {
        key: 'ca_500k_1m',
        label: 'CA annuel entre 500 001 € et 1 000 000 €',
        radioGroup: 'ca_bracket',
      },
      {
        key: 'ca_lte_500k',
        label: 'CA annuel de 500 000 € ou moins',
        radioGroup: 'ca_bracket',
      },
    ],
  },
  {
    id: 'company_age',
    title: 'Ancienneté de l\'entreprise',
    criteria: [
      {
        key: 'company_lt_6m',
        label: 'Entreprise créée il y a moins de 6 mois',
        radioGroup: 'company_age',
      },
      {
        key: 'company_6m_3y',
        label: 'Entreprise créée il y a entre 6 mois et 3 ans',
        radioGroup: 'company_age',
      },
      {
        key: 'company_gt_3y',
        label: 'Entreprise créée il y a plus de 3 ans',
        radioGroup: 'company_age',
      },
    ],
  },
  {
    id: 'insurance_history',
    title: 'Antécédents d\'assurance',
    criteria: [
      {
        key: 'currently_insured',
        label: 'Entreprise actuellement assurée pour les activités concernées',
      },
      {
        key: 'insurance_6m_5y',
        label: 'Assurée ≥ 6 mois d\'affilée sur les 5 dernières années, pour les mêmes activités',
      },
      {
        key: 'old_co_insured_1y',
        label: 'Ancienne entreprise assurée ≥ 1 an sur les 5 dernières années (mêmes activités)',
      },
    ],
  },
  {
    id: 'invoices',
    title: 'Factures',
    criteria: [
      {
        key: 'has_5_invoices_12m',
        label: '5 factures par activité sur les 12 derniers mois',
      },
      {
        key: 'has_5_invoices_old_co',
        label: '5 factures par activité sur les 12 derniers mois d\'existence de l\'ancienne entreprise',
      },
    ],
  },
  {
    id: 'experience',
    title: 'Expérience personnelle',
    criteria: [
      {
        key: 'exp_1y_5y',
        label: '≥ 1 an d\'expérience dans les 5 dernières années dans les activités demandées',
      },
      {
        key: 'exp_3y_1y5y',
        label: '≥ 3 ans d\'expérience dont au moins 1 an dans les 5 dernières années',
      },
      {
        key: 'exp_1y_10y',
        label: '≥ 1 an d\'expérience dans les 10 dernières années dans les activités demandées',
      },
      {
        key: 'exp_2y_10y',
        label: '≥ 2 ans d\'expérience dans les 10 dernières années dans les activités demandées',
      },
    ],
  },
  {
    id: 'diploma',
    title: 'Formation et diplômes',
    criteria: [
      {
        key: 'has_diploma',
        label: 'Diplôme dans les activités demandées',
      },
      {
        key: 'diploma_apprentice',
        label: 'Diplôme obtenu en apprentissage dans les 10 dernières années',
      },
    ],
  },
  {
    id: 'activities',
    title: 'Type d\'activités',
    criteria: [
      {
        key: 'has_special_activity',
        label: 'Activités incluant VRD, Maçonnerie, Menuiserie extérieure, Revêtements de surface en matériaux durs ou ITGC',
        hint: 'Ces activités requièrent 2 ans d\'expérience au lieu de 1 an pour Maxi-Poussin.',
      },
    ],
  },
];

// Flat list for quick lookup
export const ALL_CRITERIA: CriterionDefinition[] = CRITERIA_SECTIONS.flatMap(s => s.criteria);

// Radio group members for mutex logic
const RADIO_GROUPS: Record<RadioGroupKey, CriterionKey[]> = {
  ca_bracket: ['ca_gt_1m', 'ca_500k_1m', 'ca_lte_500k'],
  company_age: ['company_lt_6m', 'company_6m_3y', 'company_gt_3y', 'company_closed'],
};

export function getRadioGroupMembers(groupKey: RadioGroupKey): CriterionKey[] {
  return RADIO_GROUPS[groupKey];
}

export function getCriterionLabel(key: CriterionKey): string {
  return ALL_CRITERIA.find(c => c.key === key)?.label ?? key;
}
