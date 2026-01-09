import { AUTH_COOKIE, HTTP_CODE, METHOD, PLATFORM } from "~/lib/constants";
import { ApiError } from "~/lib/errors";
import type { CustomObject, EMethod } from "~/types/common";

export const DEFAULT_QUERY_PARAMS = { os: PLATFORM.WEB, cv: 1 };

declare global {
  interface Window {
    App: {
      apiUrl: string;
      HOST_URL: string;
      SOCKET_URL: string;
      AMPLITUDE_TRACKING_ID: string;
      AMPLITUDE_SAMPLING_RATE: number;
      APP_ENV: string;
      SENTRY_DSN: string;
    };
  }
}

const isServer = () => typeof window === "undefined";

function getBaseUrl(): string {
  if (isServer()) {
    return process.env.PROXY_SERVER_URL || "";
  }
  if (import.meta.env.VITE_ENV === "dev") {
    return "http://localhost:5173";
  }
  return window.location.origin;
}

function getAuthToken(request: Request): string {
  const cookie = request.headers.get("cookie") || "";
  const authCookie = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${AUTH_COOKIE}=`));
  return authCookie?.split("=")[1] || "";
}

function buildUrl(
  endpoint: string,
  query?: Record<string, any>
): string {
  const baseUrl = getBaseUrl();
  const url = new URL(endpoint, baseUrl);

  const allParams = { ...DEFAULT_QUERY_PARAMS, ...query };
  for (const [key, value] of Object.entries(allParams)) {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  }

  return url.toString();
}

// ============================================================================
// Server-side fetch helpers (for loaders/actions)
// ============================================================================

interface FetchOptions {
  url: string;
  fetchRequest: Request;
  useAuth?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
  body?: CustomObject | FormData;
  method?: EMethod;
  formdata?: boolean;
}

async function fetchHelper(options: FetchOptions) {
  const url = buildUrl(options.url, options.query);
  const token = options.useAuth ? getAuthToken(options.fetchRequest) : "";

  const headers: Record<string, string> = {
    "x-remix-server": "true",
    Authorization: `Bearer ${token}`,
  };

  if (!options.formdata) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.body !== undefined
      ? (options.formdata ? options.body as FormData : JSON.stringify(options.body))
      : undefined,
    credentials: "include",
    mode: "cors",
  });

  const json = await response.json();
  if (!response.ok) {
    throw new ApiError(response.status, response.statusText, json, url);
  }

  return {
    status: response.status,
    data: json,
  };
}

export async function get<ResponseType = {}>({
  url,
  useAuth = true,
  query,
  fetchRequest,
}: FetchOptions): Promise<{ status: number; data: ResponseType }> {
  const apiResponse = await fetchHelper({
    url,
    useAuth,
    query,
    fetchRequest,
    method: METHOD.GET,
  });
  return {
    status: apiResponse.status,
    data: apiResponse.data as ResponseType,
  };
}

export async function post<ResponseType = {}>({
  url,
  useAuth = true,
  body,
  query,
  fetchRequest,
  formdata,
}: FetchOptions): Promise<{ status: number; data: ResponseType }> {
  const apiResponse = await fetchHelper({
    url,
    useAuth,
    body,
    query,
    fetchRequest,
    method: METHOD.POST,
    formdata,
  });
  return {
    status: apiResponse.status,
    data: apiResponse.data as ResponseType,
  };
}

export async function put<ResponseType = {}>({
  url,
  useAuth = true,
  body,
  query,
  fetchRequest,
}: FetchOptions): Promise<{ status: number; data: ResponseType }> {
  const apiResponse = await fetchHelper({
    url,
    useAuth,
    body,
    query,
    fetchRequest,
    method: METHOD.PUT,
  });
  return {
    status: apiResponse.status,
    data: apiResponse.data as ResponseType,
  };
}

export async function patch<ResponseType = {}>({
  url,
  useAuth = true,
  body,
  query,
  fetchRequest,
}: FetchOptions): Promise<{ status: number; data: ResponseType }> {
  const apiResponse = await fetchHelper({
    url,
    useAuth,
    body,
    query,
    fetchRequest,
    method: METHOD.PATCH,
  });
  return {
    status: apiResponse.status,
    data: apiResponse.data as ResponseType,
  };
}

export async function deleteRequest<ResponseType = {}>({
  url,
  useAuth = true,
  query,
  fetchRequest,
}: FetchOptions): Promise<{ status: number; data: ResponseType }> {
  const apiResponse = await fetchHelper({
    url,
    useAuth,
    query,
    fetchRequest,
    method: METHOD.DELETE,
  });
  return {
    status: apiResponse.status,
    data: apiResponse.data as ResponseType,
  };
}

// ============================================================================
// Client-side API helper (for components)
// ============================================================================

interface ApiParams {
  request: Request;
  useAuth?: boolean;
  method?: string;
  query?: Record<string, any>;
  body?: {};
  formdata?: boolean;
  auth?: { token: string };
}

interface Options {
  method: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  credentials?: RequestCredentials;
}

export async function callApi(endpoint: string, params: ApiParams) {
  const {
    request,
    useAuth = false,
    method = METHOD.POST,
    query,
    body,
    formdata = false,
    auth,
  } = params;

  const url = buildUrl(endpoint, query);

  const options: Options = {
    method,
    headers: {},
    credentials: "include",
  };

  if (useAuth) {
    const token = getAuthToken(request) || auth?.token;
    if (token) {
      options.headers!["Authorization"] = `Bearer ${token}`;
    }
  }

  if (body) {
    if (formdata) {
      options.body = body as FormData;
    } else {
      options.body = JSON.stringify(body);
      options.headers!["Content-Type"] = "application/json";
    }
  }

  try {
    const response = await fetch(url, options);

    if (response.status === HTTP_CODE.BAD_REQUEST) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", { method, url, error });
    throw error;
  }
}

// ============================================================================
// Endpoints
// ============================================================================

export const ENDPOINTS = {
  LOGIN: "/api/v1/auth/login",
};

// ============================================================================
// API Functions (Client-side)
// ============================================================================

export function loginWithGoogle(idToken: string, request: Request) {
  return callApi(ENDPOINTS.LOGIN, {
    request,
    method: METHOD.POST,
    body: { id_token: idToken },
    useAuth: false,
  });
}