// Preserve input entered before progressive hydration finishes. Form controls
// are not forced to wait for JavaScript before accepting keyboard input.
export function initialFormValues(id, defaults) {
  if (typeof document === 'undefined') return defaults;
  const form = document.getElementById(id);
  if (!form) return defaults;
  const values = new FormData(form);
  return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [key, values.get(key) ?? fallback]));
}
