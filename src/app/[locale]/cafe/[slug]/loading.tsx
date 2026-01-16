export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden bg-brand-beige/60 animate-pulse"></div>

        <div className="h-10 w-2/3 bg-brand-beige/60 rounded mb-4 animate-pulse"></div>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-8 w-16 bg-brand-beige/60 rounded-full animate-pulse"></div>
          <div className="h-6 w-24 bg-brand-beige/60 rounded animate-pulse"></div>
        </div>

        <div className="h-20 w-full bg-brand-beige/60 rounded mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="h-8 w-32 bg-brand-beige/60 rounded mb-4 animate-pulse"></div>
            <div className="h-6 w-full bg-brand-beige/60 rounded mb-2 animate-pulse"></div>
            <div className="h-6 w-32 bg-brand-beige/60 rounded animate-pulse"></div>
          </div>

          <div>
            <div className="h-8 w-32 bg-brand-beige/60 rounded mb-4 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-6 w-24 bg-brand-beige/60 rounded animate-pulse"></div>
                  <div className="h-6 w-32 bg-brand-beige/60 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="h-8 w-40 bg-brand-beige/60 rounded mb-4 animate-pulse"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 bg-brand-beige/60 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="h-10 w-32 bg-brand-beige/60 rounded-full animate-pulse"></div>
          <div className="h-10 w-32 bg-brand-beige/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </main>
  );
}
