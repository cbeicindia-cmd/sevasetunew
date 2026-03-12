const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
