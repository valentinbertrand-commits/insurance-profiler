import { useQuestionnaire } from './hooks/useQuestionnaire';
import { getProfile } from './data/profiles';
import { ProgressBar } from './components/questionnaire/ProgressBar';
import { QuestionCard } from './components/questionnaire/QuestionCard';
import { ResultCard } from './components/result/ResultCard';

export default function App() {
  const { currentNode, canGoBack, progressPercent, stepNumber, answer, goBack, reset } =
    useQuestionnaire();

  const isResult = currentNode.type === 'result';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EBEBF5' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-10 py-4 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: '#7B6FE8' }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-800">Profil de souscription</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-8 py-14">
        <div className="w-full max-w-4xl">

          {/* Card */}
          <div
            className="bg-white rounded-3xl flex flex-col items-center"
            style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 48px rgba(123,111,232,0.10)' }}
          >
            {/* Contenu centré dans la card */}
            <div className="w-full max-w-2xl">
            {/* Progress */}
            {!isResult && (
              <div className="px-10 pt-9 pb-0">
                <ProgressBar percent={progressPercent} step={stepNumber} />
              </div>
            )}

            {/* Divider */}
            {!isResult && <div className="mx-10 mt-7 border-t border-gray-100" />}

            {/* Content */}
            <div className={isResult ? 'px-12 py-14' : 'px-10 py-9'}>
              {isResult ? (
                <ResultCard
                  profile={getProfile(
                    currentNode.type === 'result' ? currentNode.profile : 'no_match'
                  )}
                  onReset={reset}
                />
              ) : (
                currentNode.type === 'question' && (
                  <QuestionCard node={currentNode} onAnswer={answer} />
                )
              )}
            </div>

            {/* Back button */}
            {!isResult && (
              <div className="px-10 pb-9 pt-0 border-t border-gray-100">
                <button
                  onClick={goBack}
                  disabled={!canGoBack}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors duration-150 disabled:opacity-25 disabled:cursor-not-allowed hover:text-[#7B6FE8] cursor-pointer mt-6"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Question précédente
                </button>
              </div>
            )}
            </div>{/* fin max-w-2xl */}
          </div>

          {/* Footer hint */}
          {!isResult && (
            <p className="text-center text-xs text-gray-400 mt-5 animate-fade">
              Répondez aux questions pour obtenir votre profil de souscription
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
