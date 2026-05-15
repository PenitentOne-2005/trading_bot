export const VALID_COMMANDS = ["/start"] as const;

export type ValidCommand = (typeof VALID_COMMANDS)[number];
