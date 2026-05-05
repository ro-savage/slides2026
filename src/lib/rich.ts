/**
 * Tiny inline-text formatter for slide copy.
 *
 * Supports:
 *   {highlight:text}  → <span class="highlight">text</span>     (lime accent)
 *   {teal:text}       → <span class="teal">text</span>          (teal accent)
 *   {ppe:text}        → <span class="word-ppe">text</span>      (gradient PPE)
 *   {mark:✔️}         → <span class="value-mark">✔️</span>       (lime-tinted emoji)
 *   **bold**          → <strong>bold</strong>
 *
 * Authored content only — never user input — so set:html is safe.
 */
export function rich(input: string): string {
  if (!input) return '';
  return input
    .replace(/\{highlight:([^}]+)\}/g, '<span class="highlight">$1</span>')
    .replace(/\{teal:([^}]+)\}/g, '<span class="teal">$1</span>')
    .replace(/\{ppe:([^}]+)\}/g, '<span class="word-ppe">$1</span>')
    .replace(/\{mark:([^}]+)\}/g, '<span class="value-mark">$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
