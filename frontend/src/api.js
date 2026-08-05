const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error(data?.error || "Something went wrong.");
    err.status = res.status;
    err.fields = data?.fields || null;
    throw err;
  }

  return data;
}

export function submitLead(payload) {
  return request("/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function adminLogin(username, password) {
  return request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function fetchLeads(token) {
  return request("/leads", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getStoredToken() {
  return localStorage.getItem("junzle_admin_token");
}

export function storeToken(token) {
  localStorage.setItem("junzle_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("junzle_admin_token");
}
