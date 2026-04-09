interface Props {
  percent: number;
  step: number;
}

export function ProgressBar({ percent, step }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Question {step}
        </span>
        <span className="text-xs font-semibold" style={{ color: '#7B6FE8' }}>
          {percent}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%`, backgroundColor: '#7B6FE8' }}
        />
      </div>
    </div>
  );
}
