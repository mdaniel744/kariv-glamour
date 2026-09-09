export default function BrandLoading() {
  return (
    <div aria-busy="true" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6 h-10 w-48 rounded-lg bg-muted motion-safe:animate-pulse" />
      <div className="mb-6 flex gap-3 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-40 w-36 shrink-0 rounded-xl bg-muted motion-safe:animate-pulse sm:h-56 sm:w-48" />
        ))}
      </div>
      <div className="mb-6 flex gap-2 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="h-10 w-28 shrink-0 rounded-full bg-muted motion-safe:animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="aspect-[3/4] rounded-xl bg-muted motion-safe:animate-pulse" />
        ))}
      </div>
    </div>
  );
}
