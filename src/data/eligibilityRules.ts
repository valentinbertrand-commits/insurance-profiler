import type { CriterionKey, EligibilityStatus, ProfileEligibility, ProfileRule, RuleVariant } from '../types/checklist';
import type { ProfileId } from '../types/questionnaire';

const PARTIAL_THRESHOLD = 2; // <= N manquants = 'partial'

export const ELIGIBILITY_RULES: ProfileRule[] = [
  // ── Profils simples (required) ─────────────────────────────────────────────
  {
    profileId: 'ergo',
    required: ['ca_gt_1m', 'currently_insured'],
  },
  {
    profileId: 'condor',
    required: ['ca_500k_1m', 'currently_insured'],
  },
  {
    profileId: 'aigle',
    required: ['company_gt_3y', 'insurance_6m_5y'],
  },
  {
    profileId: 'coq',
    required: ['company_6m_3y', 'insurance_6m_5y', 'has_5_invoices_12m', 'exp_1y_5y'],
  },
  {
    profileId: 'corbeau',
    required: ['company_closed', 'old_co_insured_1y', 'has_5_invoices_old_co'],
  },
  {
    profileId: 'pioupiou',
    required: ['company_lt_6m', 'exp_1y_5y'],
  },

  // ── Profils avec variants (OU sur l'âge de l'entreprise) ──────────────────
  {
    profileId: 'poussin',
    variants: [
      {
        label: 'Entreprise 6 mois – 3 ans',
        required: ['company_6m_3y', 'has_5_invoices_12m', 'exp_1y_5y'],
      },
      {
        label: 'Entreprise > 3 ans',
        required: ['company_gt_3y', 'has_5_invoices_12m', 'exp_1y_5y'],
      },
    ],
  },
  {
    profileId: 'poussin_sans_facture',
    variants: [
      {
        label: 'Entreprise 6 mois – 3 ans',
        required: ['company_6m_3y', 'has_diploma', 'exp_3y_1y5y'],
      },
      {
        label: 'Entreprise > 3 ans',
        required: ['company_gt_3y', 'has_diploma', 'exp_3y_1y5y'],
      },
    ],
  },
  {
    profileId: 'maxi_poussin',
    variants: [
      {
        label: 'Activités standards — 6 mois–3 ans',
        required: ['company_6m_3y', 'diploma_apprentice', 'exp_1y_10y'],
      },
      {
        label: 'Activités standards — > 3 ans',
        required: ['company_gt_3y', 'diploma_apprentice', 'exp_1y_10y'],
      },
      {
        label: 'Activités spéciales — 6 mois–3 ans',
        required: ['company_6m_3y', 'diploma_apprentice', 'has_special_activity', 'exp_2y_10y'],
      },
      {
        label: 'Activités spéciales — > 3 ans',
        required: ['company_gt_3y', 'diploma_apprentice', 'has_special_activity', 'exp_2y_10y'],
      },
    ],
  },
];

// ── Moteur d'éligibilité ──────────────────────────────────────────────────────

function evaluateVariant(variant: RuleVariant, checked: Set<CriterionKey>): CriterionKey[] {
  return variant.required.filter(k => !checked.has(k));
}

export function computeProfileEligibility(
  rule: ProfileRule,
  checked: Set<CriterionKey>
): ProfileEligibility {
  // Cas simple : tous les critères required
  if (rule.required) {
    const missing = rule.required.filter(k => !checked.has(k));
    const status: EligibilityStatus =
      missing.length === 0
        ? 'eligible'
        : missing.length <= PARTIAL_THRESHOLD
        ? 'partial'
        : 'unreachable';
    return { profileId: rule.profileId, status, missingCriteria: missing };
  }

  // Cas variants : chercher le meilleur (moins de manquants)
  const evaluated = (rule.variants ?? []).map(v => ({
    variant: v,
    missing: evaluateVariant(v, checked),
  }));

  // Trier par nombre de manquants croissant
  evaluated.sort((a, b) => a.missing.length - b.missing.length);
  const best = evaluated[0];

  if (!best) {
    return { profileId: rule.profileId, status: 'unreachable', missingCriteria: [] };
  }

  if (best.missing.length === 0) {
    return {
      profileId: rule.profileId,
      status: 'eligible',
      missingCriteria: [],
      satisfiedVariantLabel: best.variant.label,
    };
  }

  const status: EligibilityStatus =
    best.missing.length <= PARTIAL_THRESHOLD ? 'partial' : 'unreachable';

  return {
    profileId: rule.profileId,
    status,
    missingCriteria: best.missing,
    satisfiedVariantLabel: best.variant.label,
  };
}

const STATUS_ORDER: Record<EligibilityStatus, number> = {
  eligible: 0,
  partial: 1,
  unreachable: 2,
};

// Profil display order (cohérent avec profiles.ts)
const PROFILE_ORDER: ProfileId[] = [
  'aigle', 'coq', 'corbeau', 'pioupiou', 'poussin',
  'condor', 'poussin_sans_facture', 'maxi_poussin', 'ergo',
];

export function computeAllEligibilities(checked: Set<CriterionKey>): ProfileEligibility[] {
  return ELIGIBILITY_RULES.map(rule => computeProfileEligibility(rule, checked)).sort((a, b) => {
    const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (statusDiff !== 0) return statusDiff;
    return PROFILE_ORDER.indexOf(a.profileId) - PROFILE_ORDER.indexOf(b.profileId);
  });
}
