import Axios from "axios";

export function getTenantBaseUrl(): string {
  const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  if (typeof window === 'undefined') return rawBaseUrl;

  try {
    const backendUrl = new URL(rawBaseUrl);
    const backendHost = backendUrl.hostname; // e.g. api.roomly.com or localhost
    const currentHost = window.location.hostname; // e.g. tenant1.roomly.com or tenant1.localhost

    const backendParts = backendHost.split('.');
    const currentParts = currentHost.split('.');

    // If current host is the same as backend host (no tenant), return raw
    if (currentHost === backendHost) {
      return rawBaseUrl;
    }

    // If current host has more parts (i.e. includes tenant), try to inject it
    if (
      currentParts.length > backendParts.length &&
      currentHost.endsWith(backendHost)
    ) {
      const tenant = currentParts.slice(0, currentParts.length - backendParts.length).join('.');
      const newHost = `${tenant}.${backendHost}`;
      backendUrl.hostname = newHost;
      return backendUrl.toString();
    }

    // Otherwise, return base URL without change
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

export default axios;