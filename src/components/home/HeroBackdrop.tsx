export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="hero-bg-grid absolute inset-x-0 top-0 h-[min(520px,80vh)] bg-grid-fade bg-grid" />
    </div>
  );
}
