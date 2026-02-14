import { Flame } from 'lucide-react';

interface FlameMomentumBadgeProps {
  celebrate?: boolean;
}

export default function FlameMomentumBadge({ celebrate = false }: FlameMomentumBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`relative ${
          celebrate ? 'animate-flame-burst' : 'animate-flame-flicker'
        }`}
      >
        <Flame
          className={`w-8 h-8 sm:w-10 sm:h-10 ${
            celebrate
              ? 'text-destructive fill-destructive drop-shadow-[0_0_8px_oklch(var(--destructive))]'
              : 'text-primary fill-primary'
          }`}
        />
      </div>
    </div>
  );
}
