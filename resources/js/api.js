import axios from 'axios';

// Get CSRF cookie for Sanctum SPA auth
export function getCsrfCookie() {
	return axios.get('/sanctum/csrf-cookie', { withCredentials: true });
}

// Login using session-based Sanctum SPA auth
export async function login(email, password) {
	await getCsrfCookie();
	return axios.post('/login', { email, password }, { withCredentials: true });
}

// Logout using session-based Sanctum SPA auth
export function logout() {
	return axios.post('/logout', {}, { withCredentials: true });
}

// ...existing code...