/**
 * The brand's typographic signature: a headline's closing full stop in mint —
 * the motif's filled destination node, set in type. Use only on the two
 * bookend headlines (hero and final CTA) so it stays a signature, not a tic.
 * Dark grounds only (mint on white is 1.6:1).
 */
export function MintStop({ children }: { children: string }) {
  if (!children.endsWith(".")) return <>{children}</>;
  return (
    <>
      {children.slice(0, -1)}
      <span className="text-accent">.</span>
    </>
  );
}
