type PublicFetchOptions = RequestInit & {
  next?: { revalidate?: number };
};

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
}

export async function publicFetch<T>(
  path: string,
  options: PublicFetchOptions = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const headers = new Headers(options.headers || {});

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const tenantId = process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
  if (tenantId && !headers.has("x-tenant-id")) {
    headers.set("x-tenant-id", tenantId);
  }

  // Bypass cache completely for real-time updates in CMS edits
  const fetchOptions: RequestInit = {
    ...options,
    cache: "no-store",
    headers,
  };
  // Remove next.revalidate to avoid conflicts with cache: "no-store" in Next.js
  if (fetchOptions.next) {
    delete fetchOptions.next;
  }

  const res = await fetch(`${baseUrl}${path}`, fetchOptions);

  if (!res.ok) {
    let payload: any = null;
    try {
      payload = await res.json();
    } catch {
      payload = null;
    }
    throw new Error(payload?.error || `Request failed (${res.status})`);
  }

  return (await res.json()) as T;
}

export function normalizeId<T extends { _id?: any; id?: any }>(item: T): T {
  if (!item) return item;
  const rawId = item.id ?? item._id;
  if (!rawId) return item;
  const id =
    typeof rawId === "string" ? rawId : rawId.toString?.() || String(rawId);
  return { ...item, id, _id: id };
}
