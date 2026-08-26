const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = configuredApiUrl || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem('ecoMartToken');
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
  } catch {
    throw new Error(`Unable to connect to the backend at ${API_BASE_URL}. Check that the backend is running and VITE_API_URL is correct.`);
  }
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') && response.status !== 204
    ? await response.json()
    : null;
  if (!response.ok) throw new Error(data?.error || 'Request failed');
  return data;
};

export { API_BASE_URL };
