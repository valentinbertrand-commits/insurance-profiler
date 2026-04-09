import type { QuestionNode } from '../../types/questionnaire';
import { OptionButton } from './OptionButton';

interface Props {
  node: QuestionNode;
  onAnswer: (value: string) => void;
}

export function QuestionCard({ node, onAnswer }: Props) {
  return (
    <div className="flex flex-col gap-8 animate-fade-slide">
      <div className="flex flex-col gap-3">
        <h2 className="text-[1.35rem] font-semibold text-gray-900 leading-snug tracking-tight">
          {node.question}
        </h2>
        {node.hint && (
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-400 leading-relaxed">{node.hint}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {node.options.map((option, i) => (
          <div
            key={option.value}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-fade-slide"
          >
            <OptionButton
              label={option.label}
              index={i}
              onClick={() => onAnswer(option.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
