export default function CafeCardSkeleton() {
  return (
    <div className="w-full max-w-[320px] h-[427px] rounded-xl border border-brand-beige bg-white shadow-sm overflow-hidden">
      <div className="w-full h-[280px] bg-gradient-to-br from-brand-beige/60 via-brand-beige/40 to-brand-warm/50 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-3/4 bg-brand-beige/60 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-brand-beige/60 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-brand-beige/60 rounded animate-pulse" />
        </div>
        <div className="h-8 w-full bg-brand-beige/60 rounded animate-pulse" />
      </div>
    </div>
  );
}
