const VALID_COMMANDS = ["/start"] as const;

type ValidCommand = (typeof VALID_COMMANDS)[number];

export default ValidCommand;
