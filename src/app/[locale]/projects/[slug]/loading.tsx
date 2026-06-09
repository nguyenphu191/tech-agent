export default function ProjectDetailLoading() {
  return (
    <main className="flex-1 px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 h-8 w-36 animate-pulse rounded bg-white/5" />
        <div className="aspect-[21/9] w-full animate-pulse rounded-3xl bg-white/5" />
        <div className="mt-10 space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded bg-white/5" />
          <div className="h-5 w-full animate-pulse rounded bg-white/5" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-white/5" />
          <div className="mt-6 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-20 animate-pulse rounded-full bg-white/5" />
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div className="space-y-3">
            <div className="h-5 w-20 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          </div>
          <div className="space-y-3">
            <div className="h-5 w-20 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </div>
    </main>
  );
}
