export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8 animate-pulse"></div>

      <div className="h-12 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8 animate-pulse"></div>

      <div className="py-8 pb-12 px-4 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[320px] h-[427px]">
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-[280px] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}