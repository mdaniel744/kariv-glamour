export function asArray(response) {
  if (Array.isArray(response)) return response;
  if (!response || typeof response !== 'object') return [];

  const candidates = [
    response.data,
    response.items,
    response.records,
    response.results,
    response.data?.items,
    response.data?.records,
    response.data?.results,
    response.response?.data,
    response.response?.data?.items,
    response.response?.data?.records
  ];

  return candidates.find(Array.isArray) || [];
}

export function firstRecord(response) {
  return asArray(response)[0] || null;
}
