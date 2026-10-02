const configured = import.meta.env.PUBLIC_API_URL?.trim();
const base = configured || (import.meta.env.DEV ? 'http://localhost:8787' : '');
export function apiUrl(route: string): string {
  if (!base) throw new Error('Backend URL is not configured');
  return base.replace(/\/$/, '') + route;
}
