export function Arrow({ dir = "right" }: { dir?: "right" | "left" | "down" }) {
  return (
    <svg
      className={`arrow arrow-${dir}`}
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}