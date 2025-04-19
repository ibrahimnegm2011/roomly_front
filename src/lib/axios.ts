import Axios from "axios";
import Cookies from "js-cookie";

export function getTenantBaseUrl(): string {
  const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  if (typeof window === 'undefined') return rawBaseUrl;

  try {
    const backendUrl = new URL(rawBaseUrl); // e.g., roomly.com
    const backendHost = backendUrl.hostname;
    const currentHost = window.location.hostname;

    const backendParts = backendHost.split('.');
    const currentParts = currentHost.split('.');

    if (currentHost === backendHost) {
      return rawBaseUrl; // No subdomain needed
    }

    // Check if current host is a subdomain of the backend host
    if (
      currentParts.length > backendParts.length &&
      currentHost.endsWith(backendHost)
    ) {
      const tenantSub = currentParts.slice(0, currentParts.length - backendParts.length).join('.');
      backendUrl.hostname = `${tenantSub}.${backendHost}`;
      return backendUrl.toString();
    }

    return rawBaseUrl;
  } catch (e) {
    console.warn('[getTenantBaseUrl] Invalid BACKEND_URL:', rawBaseUrl, e);
    return rawBaseUrl;
  }
}


const axios = Axios.create({
  baseURL: getTenantBaseUrl(),
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.request.use((config) => {
  const token = Cookies.get("XSRF-TOKEN");
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

export default axios;