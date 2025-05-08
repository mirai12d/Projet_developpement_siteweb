const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.REACT_APP_API_URL || '';

export async function login(credentials) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function register(userData) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}
