import type { DecisionTree } from '../types/questionnaire';

export const decisionTree: DecisionTree = {
  // ─── Q1 : CA annuel ───────────────────────────────────────────────────────
  root: {
    type: 'question',
    id: 'root',
    question: 'Quel est le chiffre d\'affaires annuel de votre entreprise ?',
    options: [
      { label: 'Plus de 1 000 000 €', value: '>1M', next: 'q1b_ergo' },
      { label: 'Entre 500 001 € et 1 000 000 €', value: '500k-1M', next: 'q1b_condor' },
      { label: '500 000 € ou moins', value: '<=500k', next: 'q3_age' },
    ],
  },

  // ─── Q1b : Actuellement assurée ? (Ergo) ─────────────────────────────────
  q1b_ergo: {
    type: 'question',
    id: 'q1b_ergo',
    question: 'Votre entreprise est-elle actuellement assurée pour les activités concernées ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'ergo' } },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // ─── Q1b : Actuellement assurée ? (Condor) ───────────────────────────────
  q1b_condor: {
    type: 'question',
    id: 'q1b_condor',
    question: 'Votre entreprise est-elle actuellement assurée pour les activités concernées ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'condor' } },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // ─── Q3 : Âge de l'entreprise ────────────────────────────────────────────
  q3_age: {
    type: 'question',
    id: 'q3_age',
    question: 'Depuis combien de temps votre entreprise est-elle créée ?',
    options: [
      { label: 'Moins de 6 mois', value: '<6m', next: 'q4_exp_pioupiou' },
      { label: 'Entre 6 mois et 3 ans', value: '6m-3y', next: 'q5_ant_6m' },
      { label: 'Plus de 3 ans', value: '>3y', next: 'q7_ant_3y' },
    ],
  },

  // ─── Branche < 6 mois ────────────────────────────────────────────────────

  // Q4 : Expérience personnelle ≥ 1 an / 5 ans
  q4_exp_pioupiou: {
    type: 'question',
    id: 'q4_exp_pioupiou',
    question: 'Avez-vous une expérience personnelle d\'au moins 1 an dans les 5 dernières années dans les activités demandées ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'pioupiou' } },
      { label: 'Non', value: 'non', next: 'q4a_corbeau_young' },
    ],
  },

  // Q4a : Ancienne entreprise fermée ? (branche < 6 mois)
  q4a_corbeau_young: {
    type: 'question',
    id: 'q4a_corbeau_young',
    question: 'Avez-vous une ancienne entreprise fermée exerçant les mêmes activités ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q4b_corbeau_young' },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // Q4b : Ancienne entreprise assurée ≥ 1 an / 5 ans (branche < 6 mois)
  q4b_corbeau_young: {
    type: 'question',
    id: 'q4b_corbeau_young',
    question: 'L\'ancienne entreprise a-t-elle été assurée au moins 1 an sur les 5 dernières années pour les mêmes activités ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q4c_corbeau_young' },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // Q4c : 5 factures (branche < 6 mois)
  q4c_corbeau_young: {
    type: 'question',
    id: 'q4c_corbeau_young',
    question: 'Avez-vous 5 factures par activité sur les 12 derniers mois d\'existence de l\'ancienne entreprise ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'corbeau' } },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // ─── Branche 6 mois – 3 ans ──────────────────────────────────────────────

  // Q5 : Antécédents assurance ≥ 6 mois
  q5_ant_6m: {
    type: 'question',
    id: 'q5_ant_6m',
    question: 'Votre entreprise est-elle assurée depuis au moins 6 mois, ou a-t-elle été assurée au total au moins 6 mois sur les 5 dernières années, pour les mêmes activités et la même entreprise ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q6_fac_coq' },
      { label: 'Non', value: 'non', next: 'q9_fac_shared' },
    ],
  },

  // Q6 : 5 factures (Coq)
  q6_fac_coq: {
    type: 'question',
    id: 'q6_fac_coq',
    question: 'Avez-vous 5 factures par activité sur les 12 derniers mois ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q6b_exp_coq' },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // Q6b : Expérience personnelle ≥ 1 an / 5 ans (Coq)
  q6b_exp_coq: {
    type: 'question',
    id: 'q6b_exp_coq',
    question: 'Avez-vous une expérience personnelle d\'au moins 1 an dans les 5 dernières années dans les activités demandées ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'coq' } },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // ─── Branche > 3 ans ─────────────────────────────────────────────────────

  // Q7 : Antécédents assurance ≥ 6 mois (Aigle)
  q7_ant_3y: {
    type: 'question',
    id: 'q7_ant_3y',
    question: 'Votre entreprise est-elle assurée depuis au moins 6 mois, ou a-t-elle été assurée au total au moins 6 mois sur les 5 dernières années, pour les mêmes activités et la même entreprise ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'aigle' } },
      { label: 'Non', value: 'non', next: 'q9_fac_shared' },
    ],
  },

  // ─── Branche partagée : Poussin / Maxi-Poussin / Corbeau ─────────────────

  // Q9 : 5 factures (commun Poussin + Maxi-Poussin)
  q9_fac_shared: {
    type: 'question',
    id: 'q9_fac_shared',
    question: 'Avez-vous 5 factures par activité sur les 12 derniers mois ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q10_exp_poussin' },
      { label: 'Non', value: 'non', next: 'q11_diplome' },
    ],
  },

  // Q10 : Expérience ≥ 1 an / 5 ans (Poussin)
  q10_exp_poussin: {
    type: 'question',
    id: 'q10_exp_poussin',
    question: 'Avez-vous une expérience personnelle d\'au moins 1 an dans les 5 dernières années dans les activités demandées ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'poussin' } },
      { label: 'Non', value: 'non', next: 'q13_apprentissage' },
    ],
  },

  // Q11 : Diplôme (branche sans factures → Poussin SF uniquement)
  q11_diplome: {
    type: 'question',
    id: 'q11_diplome',
    question: 'Avez-vous un diplôme dans les activités demandées ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q12_exp3ans' },
      { label: 'Non', value: 'non', next: 'q8_corbeau' },
    ],
  },

  // Q12 : Expérience ≥ 3 ans dont 1 an / 5 ans (Poussin SF)
  q12_exp3ans: {
    type: 'question',
    id: 'q12_exp3ans',
    question: 'Avez-vous au moins 3 ans d\'expérience dont au moins 1 an dans les 5 dernières années dans les activités demandées ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'poussin_sans_facture' } },
      { label: 'Non', value: 'non', next: 'q8_corbeau' },
    ],
  },

  // Q13 : Diplôme en apprentissage (Maxi-Poussin — factures déjà confirmées)
  q13_apprentissage: {
    type: 'question',
    id: 'q13_apprentissage',
    question: 'Votre diplôme dans les activités demandées a-t-il été obtenu en apprentissage dans les 10 dernières années ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q14_activite_spec' },
      { label: 'Non', value: 'non', next: 'q8_corbeau' },
    ],
  },

  // Q14 : Activité à seuil majoré
  q14_activite_spec: {
    type: 'question',
    id: 'q14_activite_spec',
    question: 'Vos activités incluent-elles l\'une des suivantes : VRD, Maçonnerie, Menuiserie extérieure, Revêtements de surface en matériaux durs ou ITGC ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q15_exp2ans' },
      { label: 'Non', value: 'non', next: 'q16_exp1an' },
    ],
  },

  // Q15 : Expérience ≥ 2 ans / 10 ans (activité spéciale)
  q15_exp2ans: {
    type: 'question',
    id: 'q15_exp2ans',
    question: 'Avez-vous au moins 2 ans d\'expérience dans ces activités au cours des 10 dernières années ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'maxi_poussin' } },
      { label: 'Non', value: 'non', next: 'q8_corbeau' },
    ],
  },

  // Q16 : Expérience ≥ 1 an / 10 ans (activité standard)
  q16_exp1an: {
    type: 'question',
    id: 'q16_exp1an',
    question: 'Avez-vous au moins 1 an d\'expérience dans les activités demandées au cours des 10 dernières années ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'maxi_poussin' } },
      { label: 'Non', value: 'non', next: 'q8_corbeau' },
    ],
  },

  // ─── Branche Corbeau (dernier recours — branche > 3 ans) ─────────────────

  // Q8 : Ancienne entreprise fermée ?
  q8_corbeau: {
    type: 'question',
    id: 'q8_corbeau',
    question: 'Avez-vous une ancienne entreprise fermée exerçant les mêmes activités ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q8a_corbeau_ant' },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // Q8a : Ancienne entreprise assurée ≥ 1 an / 5 ans
  q8a_corbeau_ant: {
    type: 'question',
    id: 'q8a_corbeau_ant',
    question: 'L\'ancienne entreprise a-t-elle été assurée au moins 1 an sur les 5 dernières années pour les mêmes activités ?',
    options: [
      { label: 'Oui', value: 'oui', next: 'q8b_corbeau_fac' },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // Q8b : 5 factures ancienne entreprise
  q8b_corbeau_fac: {
    type: 'question',
    id: 'q8b_corbeau_fac',
    question: 'Avez-vous 5 factures par activité sur les 12 derniers mois d\'existence de l\'ancienne entreprise ?',
    options: [
      { label: 'Oui', value: 'oui', next: { result: 'corbeau' } },
      { label: 'Non', value: 'non', next: { result: 'no_match' } },
    ],
  },

  // ─── Nœuds résultats ─────────────────────────────────────────────────────
  result_aigle: { type: 'result', id: 'result_aigle', profile: 'aigle' },
  result_coq: { type: 'result', id: 'result_coq', profile: 'coq' },
  result_corbeau: { type: 'result', id: 'result_corbeau', profile: 'corbeau' },
  result_pioupiou: { type: 'result', id: 'result_pioupiou', profile: 'pioupiou' },
  result_poussin: { type: 'result', id: 'result_poussin', profile: 'poussin' },
  result_condor: { type: 'result', id: 'result_condor', profile: 'condor' },
  result_poussin_sans_facture: { type: 'result', id: 'result_poussin_sans_facture', profile: 'poussin_sans_facture' },
  result_maxi_poussin: { type: 'result', id: 'result_maxi_poussin', profile: 'maxi_poussin' },
  result_ergo: { type: 'result', id: 'result_ergo', profile: 'ergo' },
  result_no_match: { type: 'result', id: 'result_no_match', profile: 'no_match' },
};
