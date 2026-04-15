'use client';

export default function DrugsLogo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const isLarge = size === 'large';

  return (
    <div className="flex flex-col items-start">
      {/* D.R.U.G.S. in DARE style — bold, italic, slanted, brush-like */}
      <div
        className={`relative ${isLarge ? 'mb-1' : 'mb-0.5'}`}
        style={{ transform: 'rotate(-2deg)' }}
      >
        <span
          className={`font-black italic tracking-[0.08em] leading-none ${
            isLarge ? 'text-4xl' : 'text-2xl'
          }`}
          style={{
            fontFamily: "'Impact', 'Arial Black', 'Haettenschweiler', sans-serif",
            color: '#DC2626',
            textShadow: '2px 2px 0px #7F1D1D, -1px -1px 0px rgba(0,0,0,0.3)',
            letterSpacing: '0.06em',
            WebkitTextStroke: '0.5px #991B1B',
          }}
        >
          D.R.U.G.S.
        </span>
      </div>

      {/* Acronym definition */}
      <p
        className={`tracking-[0.15em] uppercase font-medium ${
          isLarge
            ? 'text-[11px] text-lexis-text-secondary'
            : 'text-[9px] text-lexis-text-tertiary'
        }`}
      >
        Directed Reasoning Using GPTs
      </p>
    </div>
  );
}
