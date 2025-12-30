type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: QueryParams;
  body?: unknown;
  headers?: HeadersInit;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    query,
    body,
    headers,
  } = options;

  let url = `${API_BASE_URL}${endpoint}`;

  if (query && Object.keys(query).length > 0) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }

    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }

  return res.json();
}
