import type { ProfileId } from './questionnaire';

export type CriterionKey =
  // CA
  | 'ca_gt_1m'
  | 'ca_500k_1m'
  | 'ca_lte_500k'
  // Assurance courante
  | 'currently_insured'
  // Âge entreprise
  | 'company_lt_6m'
  | 'company_6m_3y'
  | 'company_gt_3y'
  | 'company_closed'
  // Antécédents assurance
  | 'insurance_6m_5y'
  | 'old_co_insured_1y'
  // Factures
  | 'has_5_invoices_12m'
  | 'has_5_invoices_old_co'
  // Expérience
  | 'exp_1y_5y'
  | 'exp_3y_1y5y'
  | 'exp_1y_10y'
  | 'exp_2y_10y'
  // Diplômes
  | 'has_diploma'
  | 'diploma_apprentice'
  // Activités
  | 'has_special_activity';

export type RadioGroupKey = 'ca_bracket' | 'company_age';

export interface CriterionDefinition {
  key: CriterionKey;
  label: string;
  hint?: string;
  radioGroup?: RadioGroupKey;
}

export interface CriteriaSection {
  id: string;
  title: string;
  criteria: CriterionDefinition[];
}

export interface RuleVariant {
  label?: string;
  required: CriterionKey[];
}

export interface ProfileRule {
  profileId: ProfileId;
  required?: CriterionKey[];
  variants?: RuleVariant[];
  forbidden?: CriterionKey[]; // si l'un de ces critères est coché → unreachable
}

export type ChecklistState = Set<CriterionKey>;

export type EligibilityStatus = 'eligible' | 'partial' | 'unreachable';

export interface ProfileEligibility {
  profileId: ProfileId;
  status: EligibilityStatus;
  missingCriteria: CriterionKey[];
  satisfiedVariantLabel?: string;
}
