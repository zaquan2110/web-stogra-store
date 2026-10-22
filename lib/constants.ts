export const STORE_NAME = "STOGRA STORE";

export const STORE_DESCRIPTION =
  "Marketplace digital untuk Roblox Studio: Script, UI, Map, Assets, dan Services.";

export const PRODUCT_CATEGORIES = [
  "Roblox Script",
  "UI",
  "Map",
  "Assets",
  "Services",
] as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  WAITING_CONFIRMATION: "waiting_confirmation",
  PAID: "paid",
  CANCELLED: "cancelled",
} as const;

export const SUPPORT_CHANNELS = {
  WEBSITE_CHAT: "/chat",
  DISCORD: "/discord",
} as const;

export const MAX_PRODUCT_DESCRIPTION_LENGTH = 5000;
export const MAX_ORDER_NOTES_LENGTH = 1000;
