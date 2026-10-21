/** Minimal App Shell fallback for dynamic routes: the dark hero band, no content. */
export function PageSkeleton() {
  return (
    <div data-theme="dark" aria-busy="true" className="bg-surface">
      <div className="container-site pt-14 pb-28">
        <div className="h-3 w-40 rounded-xs bg-surface-raised" />
        <div className="mt-6 h-14 w-full max-w-[640px] rounded-sm bg-surface-raised" />
        <div className="mt-4 h-14 w-2/3 max-w-[480px] rounded-sm bg-surface-raised" />
      </div>
    </div>
  );
}
