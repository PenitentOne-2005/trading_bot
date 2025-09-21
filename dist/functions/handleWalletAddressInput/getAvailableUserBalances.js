const getAvailableUserBalances = (tokens, balance) => {
    return tokens
        .filter((token) => balance?.[token.key] && balance[token.key] > 0)
        .map((token) => `* ${token.label}: ${balance?.[token.key]} ${token.label}`)
        .join("\n");
};
export default getAvailableUserBalances;
