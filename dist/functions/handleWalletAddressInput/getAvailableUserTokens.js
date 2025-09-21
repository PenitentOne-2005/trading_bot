const getAvailableUserTokens = ({ tokens, balance, }) => {
    return tokens.filter((token) => balance?.[token.key] && balance[token.key] > 0);
};
export default getAvailableUserTokens;
