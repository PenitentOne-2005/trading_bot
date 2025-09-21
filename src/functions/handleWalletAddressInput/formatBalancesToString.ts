import { FormatBalancesToString } from "./interface.js";

const formatBalancesToString: FormatBalancesToString = ({
  tokens,
  balance,
}) => {
  return tokens
    .map((token) => `* ${token.label}: ${balance?.[token.key]} ${token.label}`)
    .join("\n");
};

export default formatBalancesToString;
