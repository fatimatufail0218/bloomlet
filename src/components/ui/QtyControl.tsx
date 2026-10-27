"use client";

export function QtyControl({
  name,
  count,
  canAdd,
  onAdd,
  onRemove,
}: {
  name: string;
  count: number;
  canAdd: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <span className="qty" role="group" aria-label={`${name} quantity`}>
      <button type="button" className="qty-btn" onClick={onRemove} aria-label={`Remove one ${name}`}>
        −
      </button>
      <span className="qty-value" aria-live="polite">
        {count}
      </span>
      <button
        type="button"
        className="qty-btn"
        onClick={onAdd}
        disabled={!canAdd}
        aria-label={`Add one more ${name}`}
      >
        +
      </button>
    </span>
  );
}