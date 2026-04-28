import type { ProfileEligibility } from '../../types/checklist';
import { ProfileStatusCard } from './ProfileStatusCard';

interface Props {
  eligibilities: ProfileEligibility[];
  eligibleCount: number;
  partialCount: number;
  unreachableCount: number;
}

export function EligibilityBoard({ eligibilities, eligibleCount, partialCount, unreachableCount }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Compteurs */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {eligibleCount} éligible{eligibleCount !== 1 ? 's' : ''}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-500">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          {partialCount} presque
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          {unreachableCount} hors de portée
        </span>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-3 gap-3">
        {eligibilities.map(e => (
          <ProfileStatusCard key={e.profileId} eligibility={e} />
        ))}
      </div>
    </div>
  );
}
