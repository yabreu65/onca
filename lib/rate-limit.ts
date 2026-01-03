/**
 * Simple in-memory rate limiter
 * For production with multiple instances, consider using Redis with @upstash/ratelimit
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now > value.resetTime) {
      store.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed within the window
   */
  limit: number;
  /**
   * Time window in milliseconds
   */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

/**
 * Rate limiter function
 * @param identifier - Unique identifier (usually IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 5, windowMs: 60 * 60 * 1000 } // Default: 5 requests per hour
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  // No previous requests or window expired
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    store.set(identifier, { count: 1, resetTime });
    return {
      success: true,
      remaining: config.limit - 1,
      reset: resetTime,
    };
  }

  // Within window
  if (entry.count < config.limit) {
    entry.count++;
    store.set(identifier, entry);
    return {
      success: true,
      remaining: config.limit - entry.count,
      reset: entry.resetTime,
    };
  }

  // Rate limit exceeded
  return {
    success: false,
    remaining: 0,
    reset: entry.resetTime,
  };
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}
