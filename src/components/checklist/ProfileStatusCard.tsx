import { getCriterionLabel } from '../../data/checklistCriteria';
import { getProfile } from '../../data/profiles';
import type { ProfileEligibility } from '../../types/checklist';

interface Props {
  eligibility: ProfileEligibility;
}

export function ProfileStatusCard({ eligibility }: Props) {
  const profile = getProfile(eligibility.profileId);
  const { status, missingCriteria } = eligibility;

  // ── Éligible ────────────────────────────────────────────────────────────────
  if (status === 'eligible') {
    return (
      <div className="rounded-lg p-2.5 flex flex-col gap-1.5 transition-all duration-300 bg-emerald-50 border border-emerald-200">
        <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full self-start bg-emerald-100 text-emerald-700">
          <svg className="w-1.5 h-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          Éligible
        </span>
        <p className="text-xs font-bold leading-tight text-emerald-800">
          {profile.name}
        </p>
      </div>
    );
  }

  // ── Presque ─────────────────────────────────────────────────────────────────
  if (status === 'partial') {
    return (
      <div className="rounded-lg p-2.5 flex flex-col gap-1.5 bg-white border border-gray-200 transition-all duration-300">
        <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-500 self-start">
          <svg className="w-1.5 h-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          Presque
        </span>
        <p className="text-xs font-bold text-gray-800 leading-tight">{profile.name}</p>
        <div className="flex flex-col gap-0.5 border-t border-gray-100 pt-1.5">
          <p className="text-[8px] font-semibold uppercase tracking-wider text-gray-400">Il manque</p>
          <ul className="flex flex-col gap-0.5">
            {missingCriteria.map(key => (
              <li key={key} className="flex items-start gap-1">
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-1 shrink-0" />
                <span className="text-[10px] text-gray-500 leading-snug">{getCriterionLabel(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // ── Hors de portée ──────────────────────────────────────────────────────────
  return (
    <div className="rounded-lg p-2.5 flex flex-col gap-1.5 bg-gray-50 border border-gray-100 transition-all duration-300">
      <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 self-start">
        <svg className="w-1.5 h-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Hors de portée
      </span>
      <p className="text-xs font-bold text-gray-400 leading-tight">{profile.name}</p>
      {missingCriteria.length > 0 && (
        <p className="text-[10px] text-gray-400 border-t border-gray-100 pt-1">
          {missingCriteria.length} critère{missingCriteria.length > 1 ? 's' : ''} manquant{missingCriteria.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
