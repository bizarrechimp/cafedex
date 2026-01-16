export default function CafeCardSkeleton() {
  return (
    <div className="w-full max-w-[320px] h-[427px] rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="w-full h-[280px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="h-8 w-full bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>
    </div>
  );
}
