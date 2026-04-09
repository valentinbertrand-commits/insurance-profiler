interface Props {
  label: string;
  index: number;
  onClick: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function OptionButton({ label, index, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-[#7B6FE8] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7B6FE8] focus:ring-offset-2 cursor-pointer overflow-hidden"
      style={{
        '--tw-shadow': '0 8px 24px rgba(123, 111, 232, 0.15)',
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-4 px-5 py-5">
        {/* Letter badge */}
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200 bg-gray-100 text-gray-500 group-hover:bg-[#7B6FE8] group-hover:text-white"
        >
          {LETTERS[index] ?? index + 1}
        </span>

        {/* Label */}
        <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 leading-snug">
          {label}
        </span>

        {/* Arrow */}
        <svg
          className="w-4 h-4 text-gray-300 group-hover:text-[#7B6FE8] transition-all duration-200 group-hover:translate-x-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Bottom accent bar */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-out"
        style={{ backgroundColor: '#7B6FE8' }}
      />
    </button>
  );
}
