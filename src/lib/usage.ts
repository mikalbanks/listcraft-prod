const STORAGE_KEY = 'listcraft_usage_count';
const FREE_LIMIT_ANON = 5;
const FREE_LIMIT_SIGNUP = 10;

export function getUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
}

export function incrementUsage(): number {
  const count = getUsageCount() + 1;
  localStorage.setItem(STORAGE_KEY, String(count));
  return count;
}

export function getMaxFreeUsage(isLoggedIn = false): number {
  return isLoggedIn ? FREE_LIMIT_SIGNUP : FREE_LIMIT_ANON;
}

export function hasReachedLimit(isLoggedIn = false): boolean {
  return getUsageCount() >= getMaxFreeUsage(isLoggedIn);
}

export function shouldShowSignupModal(isLoggedIn = false): boolean {
  if (isLoggedIn) return false; // Already signed up
  return getUsageCount() >= FREE_LIMIT_ANON;
}

export function shouldShowPricingModal(isLoggedIn = false): boolean {
  const limit = isLoggedIn ? FREE_LIMIT_SIGNUP : FREE_LIMIT_SIGNUP;
  return getUsageCount() >= limit;
}
