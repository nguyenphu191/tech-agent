export default function ProjectsLoading() {
  return (
    <main className="flex-1 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-white/5" />
        <div className="mt-4 h-5 w-96 animate-pulse rounded bg-white/5" />
        <div className="mt-10 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-white/5" />
          ))}
        </div>
        <div className="mt-12 columns-1 gap-6 sm:columns-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/5"
            >
              <div className="aspect-[4/3] w-full animate-pulse bg-white/5 sm:aspect-[16/10]" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
