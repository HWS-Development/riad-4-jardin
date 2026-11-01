const ids = ['reservation', 'prices', 'rates', 'payment', 'cancellation', 'refunds', 'arrival', 'requests', 'unavailability', 'contact'];
function text(value, max = 4000) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw new Error('Invalid booking conditions text');
  return value;
}
function strings(value) {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || !value.length || value.length > 30) throw new Error('Invalid booking conditions list');
  return value.map(item => text(item));
}

// Only public policy fields leave the server. Internal approval notes and source
// file metadata from the client document are never included in the HTML payload.
export function validateConditions(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value.updatedAt) || Number.isNaN(Date.parse(value.updatedAt))) throw new Error('Invalid booking conditions date');
  if (new Date(value.updatedAt).toISOString().slice(0, 10) !== value.updatedAt) throw new Error('Invalid booking conditions calendar date');
  if (!Array.isArray(value.sections) || value.sections.length !== ids.length) throw new Error('Booking conditions must contain the ten approved sections');
  const sections = value.sections.map((section, index) => {
    if (section.id !== ids[index]) throw new Error(`Invalid booking conditions section: ${section.id}`);
    const result = { id: section.id, title: text(section.title, 200) };
    if (section.paragraphs) result.paragraphs = strings(section.paragraphs);
    if (section.items) result.items = strings(section.items);
    if (section.rates) {
      if (section.id !== 'rates' || !Array.isArray(section.rates) || section.rates.length !== 3) throw new Error('Invalid rate conditions');
      result.rates = section.rates.map((rate, index) => {
        if (rate.id !== ['flexible', 'non-refundable', 'promotional'][index]) throw new Error('Invalid rate condition identifier');
        const items = strings(rate.items);
        if (!items) throw new Error('Rate conditions must not be empty');
        return { id: rate.id, title: text(rate.title, 200), items };
      });
    }
    if (!result.paragraphs && !result.items && !result.rates) throw new Error(`Empty booking conditions section: ${section.id}`);
    return result;
  });
  return { title: text(value.title, 200), updatedAt: value.updatedAt, sections };
}
