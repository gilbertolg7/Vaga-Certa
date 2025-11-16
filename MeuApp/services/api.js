import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:4000'; // Android emulator default. Use localhost or LAN IP on other targets.

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

async function authorized(method, path, body) {
  const token = await AsyncStorage.getItem('@vagacerta_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function updateProfile(payload) {
  return authorized('PUT', '/auth/me', payload);
}

export async function getProfile() {
  return authorized('GET', '/auth/me');
}

export async function createJob(payload) {
  return authorized('POST', '/jobs', payload);
}

export async function getJobs(query = {}) {
  const qs = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
  const path = `/jobs${qs ? `?${qs}` : ''}`;
  return authorized('GET', path);
}

export async function deleteJob(id) {
  return authorized('DELETE', `/jobs/${encodeURIComponent(id)}`);
}

export async function registerUser(payload) {
  return post('/auth/register-user', payload);
}

export async function registerCompany(payload) {
  return post('/auth/register-company', payload);
}

export async function login(email, password) {
  return post('/auth/login', { email, password });
}

export async function saveToken(token) {
  await AsyncStorage.setItem('@vagacerta_token', token);
}

export async function getToken() {
  return AsyncStorage.getItem('@vagacerta_token');
}

export async function logout() {
  await AsyncStorage.removeItem('@vagacerta_token');
}

export default { BASE_URL, registerUser, registerCompany, login, saveToken, getToken, logout, updateProfile, getProfile, createJob, getJobs, deleteJob }; 
