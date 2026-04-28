import { getCriterionLabel } from '../../data/checklistCriteria';
import { getProfile } from '../../data/profiles';
import type { ProfileEligibility } from '../../types/checklist';

interface Props {
  eligibility: ProfileEligibility;
}

export function ProfileStatusCard({ eligibility }: Props) {
  const profile = getProfile(eligibility.profileId);
  const { status, missingCriteria, satisfiedVariantLabel } = eligibility;

  if (status === 'eligible') {
    return (
      <div
        className="rounded-2xl p-4 flex flex-col gap-2 transition-all duration-300"
        style={{ backgroundColor: profile.bgColor }}
      >
        {/* Badge */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: profile.color + '22', color: profile.color }}
          >
            Éligible
          </span>
          <svg className="w-4 h-4" fill="none" stroke={profile.color} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Nom */}
        <p className="text-base font-bold leading-tight" style={{ color: profile.color }}>
          {profile.name}
        </p>
        {satisfiedVariantLabel && (
          <p className="text-xs text-gray-500">{satisfiedVariantLabel}</p>
        )}
      </div>
    );
  }

  if (status === 'partial') {
    return (
      <div
        className="rounded-2xl p-4 flex flex-col gap-2 bg-white border-l-4 transition-all duration-300"
        style={{ borderLeftColor: profile.color }}
      >
        {/* Badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
            Presque
          </span>
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        {/* Nom */}
        <p className="text-base font-bold text-gray-800 leading-tight">{profile.name}</p>
        {/* Manquants */}
        <ul className="flex flex-col gap-1">
          {missingCriteria.map(key => (
            <li key={key} className="flex items-start gap-1.5">
              <span className="text-amber-400 mt-0.5 shrink-0">—</span>
              <span className="text-xs text-gray-500 leading-snug">{getCriterionLabel(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // unreachable
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-2 bg-gray-50 border border-gray-100 transition-all duration-300">
      {/* Badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
          Hors de portée
        </span>
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      {/* Nom */}
      <p className="text-base font-bold text-gray-400 leading-tight">{profile.name}</p>
      {missingCriteria.length > 0 && (
        <p className="text-xs text-gray-400">
          {missingCriteria.length} critère{missingCriteria.length > 1 ? 's' : ''} manquant{missingCriteria.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
