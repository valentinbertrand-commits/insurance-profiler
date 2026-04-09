import type { ProfileDefinition } from '../types/questionnaire';

export const profiles: ProfileDefinition[] = [
  {
    id: 'aigle',
    name: 'Aigle',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    isEligible: true,
  },
  {
    id: 'coq',
    name: 'Coq',
    color: '#D97706',
    bgColor: '#FFFBEB',
    isEligible: true,
  },
  {
    id: 'corbeau',
    name: 'Corbeau',
    color: '#374151',
    bgColor: '#F3F4F6',
    isEligible: true,
  },
  {
    id: 'pioupiou',
    name: 'Pioupiou',
    color: '#059669',
    bgColor: '#ECFDF5',
    isEligible: true,
  },
  {
    id: 'poussin',
    name: 'Poussin',
    color: '#CA8A04',
    bgColor: '#FEFCE8',
    isEligible: true,
  },
  {
    id: 'condor',
    name: 'Condor',
    color: '#7B6FE8',
    bgColor: '#EEE9FF',
    isEligible: true,
  },
  {
    id: 'poussin_sans_facture',
    name: 'Poussin sans facture',
    color: '#0891B2',
    bgColor: '#ECFEFF',
    isEligible: true,
  },
  {
    id: 'maxi_poussin',
    name: 'Maxi-Poussin',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    isEligible: true,
  },
  {
    id: 'ergo',
    name: 'ERGO',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    isEligible: true,
  },
  {
    id: 'no_match',
    name: 'Non assurable',
    color: '#9CA3AF',
    bgColor: '#F9FAFB',
    isEligible: false,
  },
];

export function getProfile(id: string): ProfileDefinition {
  return profiles.find((p) => p.id === id) ?? profiles[profiles.length - 1];
}
