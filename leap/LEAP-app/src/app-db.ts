export function getDbValue(key: string): string | null {
  return localStorage.getItem(key);
}

export function setDbValue(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function removeDbValue(key: string): void {
  localStorage.removeItem(key);
}

export function getDbJson<T>(key: string, fallback: T): T {
  const raw = getDbValue(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setDbJson<T>(key: string, value: T): void {
  setDbValue(key, JSON.stringify(value));
}
