export const PLATFORM = { ANDROID: 1, WEB: 2, IOS: 3 };

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const AUTH_COOKIE = 'aKookie';
export const ADMIN_AUTH_COOKIE = 'admin_aKookie'; // Stores admin token during proxy login
export const DEVICE_COOKIE = 'deviceId';
export const BROWSER_DEVICE_COOKIE = 'bdid';
export const AUTH_BEARER = 'Bearer ';
export const FCM_TOKEN_COOKIE = 'fcmToken';

export const HTTP_CODE = {
  OK: 200,
  PERMANENT_REDIRECT: 301,
  TEMP_REDIRECT: 302,
  BAD_REQUEST: 400,
  NO_AUTH: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const;

export const BOOLEAN_INT = { TRUE: 1, FALSE: 0 } as const;