export const MAX_PUBLIC_DEALER_SUMMARIES = 50;

const EMPTY_SUMMARY = Object.freeze({
  displayName: '',
  verifiedStatus: 'unverified',
  averageRating: 0,
  totalReviews: 0,
  ratingsAvailable: false,
});

export function emptyDealerRatingSummary() {
  return { ...EMPTY_SUMMARY };
}

export function normalizePublicDealerIds(dealerIds) {
  if (!Array.isArray(dealerIds)) return [];
  return [...new Set(dealerIds
    .map((dealerId) => String(dealerId || '').trim())
    .filter((dealerId) => dealerId.length > 0 && dealerId.length <= 160))]
    .slice(0, MAX_PUBLIC_DEALER_SUMMARIES);
}

function latestApplicationMap(dealerIds, applicationRows = []) {
  const allowedIds = new Set(normalizePublicDealerIds(dealerIds));
  const latestApplications = new Map();
  for (const application of [...applicationRows].sort((left, right) => (
    String(right?.created_at || '').localeCompare(String(left?.created_at || ''))
  ))) {
    const dealerId = application?.dealer_user_id;
    if (allowedIds.has(dealerId) && !latestApplications.has(dealerId)) {
      latestApplications.set(dealerId, application);
    }
  }
  return latestApplications;
}

export function approvedPublicDealerIds(dealerIds, applicationRows = []) {
  const ids = normalizePublicDealerIds(dealerIds);
  const latestApplications = latestApplicationMap(ids, applicationRows);
  return ids.filter((dealerId) => latestApplications.get(dealerId)?.status === 'approved');
}

export function buildDealerRatingSummaries({
  dealerIds,
  reviewRows = [],
  applicationRows = [],
  identitiesById = new Map(),
  ratingsAvailable = true,
}) {
  const ids = approvedPublicDealerIds(dealerIds, applicationRows);
  const allowedIds = new Set(ids);
  const reviewTotals = new Map(ids.map((dealerId) => [dealerId, { count: 0, total: 0 }]));

  for (const review of reviewRows) {
    const dealerId = review?.dealer_user_id;
    if (!allowedIds.has(dealerId) || (review.status && review.status !== 'approved')) continue;
    const rating = Number(review.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) continue;
    const aggregate = reviewTotals.get(dealerId);
    aggregate.count += 1;
    aggregate.total += rating;
  }

  const latestApplications = latestApplicationMap(ids, applicationRows);

  return Object.fromEntries(ids.map((dealerId) => {
    const aggregate = reviewTotals.get(dealerId);
    const approvedApplication = latestApplications.get(dealerId);
    const identity = identitiesById instanceof Map
      ? identitiesById.get(dealerId)
      : identitiesById?.[dealerId];
    const averageRating = aggregate.count
      ? Math.round((aggregate.total / aggregate.count) * 10) / 10
      : 0;

    return [dealerId, {
      displayName: approvedApplication?.company_name || identity?.fullName || '',
      verifiedStatus: approvedApplication ? 'verified' : 'unverified',
      averageRating,
      totalReviews: aggregate.count,
      ratingsAvailable,
    }];
  }));
}
