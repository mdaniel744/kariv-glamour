export default function ProductLoading() {
  return (
    <div aria-busy="true" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12" aria-hidden="true">
        <div className="aspect-square rounded-xl bg-card motion-safe:animate-pulse" />
        <div className="space-y-5">
          <div className="h-4 w-32 rounded bg-card motion-safe:animate-pulse" />
          <div className="h-10 w-full rounded bg-card motion-safe:animate-pulse" />
          <div className="h-8 w-32 rounded bg-card motion-safe:animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-16 rounded-xl bg-card motion-safe:animate-pulse" />)}
          </div>
          <div className="h-14 rounded-xl bg-card motion-safe:animate-pulse" />
        </div>
      </div>
    </div>
  );
}
