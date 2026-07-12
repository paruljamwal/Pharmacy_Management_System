export function getHighlightedParts(text, query) {
  const source = String(text ?? '');
  const normalizedQuery = String(query ?? '').trim();

  if (!normalizedQuery) {
    return [{ text: source, match: false }];
  }

  const lowerSource = source.toLowerCase();
  const lowerQuery = normalizedQuery.toLowerCase();
  const parts = [];
  let cursor = 0;
  let matchIndex = lowerSource.indexOf(lowerQuery);

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      parts.push({ text: source.slice(cursor, matchIndex), match: false });
    }

    parts.push({
      text: source.slice(matchIndex, matchIndex + normalizedQuery.length),
      match: true,
    });

    cursor = matchIndex + normalizedQuery.length;
    matchIndex = lowerSource.indexOf(lowerQuery, cursor);
  }

  if (cursor < source.length) {
    parts.push({ text: source.slice(cursor), match: false });
  }

  return parts.length ? parts : [{ text: source, match: false }];
}
