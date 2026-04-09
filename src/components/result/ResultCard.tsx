import type { ProfileDefinition } from '../../types/questionnaire';

interface Props {
  profile: ProfileDefinition;
  onReset: () => void;
}

export function ResultCard({ profile, onReset }: Props) {
  if (!profile.isEligible) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-4 animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Résultat</p>
          <h1 className="text-2xl font-bold text-gray-800">Entreprise non assurable</h1>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto mt-1">
            D'après vos réponses, votre dossier ne remplit pas les critères d'éligibilité. Contactez directement un conseiller.
          </p>
        </div>
        <button
          onClick={onReset}
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-150 cursor-pointer"
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center py-4 animate-scale-in">
      {/* Badge profil */}
      <div className="relative">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: profile.bgColor }}
        >
          <svg className="w-8 h-8" fill="none" stroke={profile.color} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Halo */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-30 -z-10 scale-125"
          style={{ backgroundColor: profile.color }}
        />
      </div>

      {/* Texte */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Profil attribué
        </p>
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ color: profile.color }}
        >
          {profile.name}
        </h1>
      </div>

      {/* Divider */}
      <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: profile.bgColor }} />

      {/* CTA */}
      <button
        onClick={onReset}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-150 cursor-pointer"
      >
        Recommencer
      </button>
    </div>
  );
}
