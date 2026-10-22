export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidUsername(value: string): boolean {
  return /^[a-zA-Z0-9_.-]{3,32}$/.test(value.trim());
}

export function isValidOrderCode(value: string): boolean {
  return /^[a-zA-Z0-9_-]{4,64}$/.test(value.trim());
}

export function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function validateRequiredText(
  value: string,
  minLength = 1,
  maxLength = 500
): boolean {
  const text = value.trim();

  return text.length >= minLength && text.length <= maxLength;
}

export function validatePrice(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

export function validateQuantity(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 100;
}

export function validateChatMessage(value: string): boolean {
  const text = value.trim();

  return text.length >= 1 && text.length <= 2000;
}
