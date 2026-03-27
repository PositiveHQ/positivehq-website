import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'pwc_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PORTAL_PASSWORD || '';
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
}

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function verifySessionToken(token: string) {
  const [payload, providedSignature] = token.split('.');
  if (!payload || !providedSignature) return false;

  const expectedSignature = sign(payload);
  const isSignatureValid = safeCompare(providedSignature, expectedSignature);
  if (!isSignatureValid) return false;

  const expiresAt = Number(payload);
  if (Number.isNaN(expiresAt)) return false;

  return expiresAt > Math.floor(Date.now() / 1000);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PORTAL_PASSWORD) && Boolean(getSessionSecret());
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

export function validateAdminPassword(input: string) {
  const expected = process.env.ADMIN_PORTAL_PASSWORD;
  if (!expected) return false;
  return safeCompare(input, expected);
}
