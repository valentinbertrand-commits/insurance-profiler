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
    <div className="flex flex-col gap-5">
      {/* Compteurs */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          {eligibleCount} éligible{eligibleCount !== 1 ? 's' : ''}
        </span>
        <span className="text-gray-200">·</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          {partialCount} presque
        </span>
        <span className="text-gray-200">·</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
          {unreachableCount} hors de portée
        </span>
      </div>

      {/* Grille 3 colonnes */}
      <div className="grid grid-cols-3 gap-3">
        {eligibilities.map(e => (
          <ProfileStatusCard key={e.profileId} eligibility={e} />
        ))}
      </div>
    </div>
  );
}
