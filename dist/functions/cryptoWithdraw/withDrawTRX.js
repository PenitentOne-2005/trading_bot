const withDrawTRX = async (props) => {
    const { userState, chatId, tronWeb, fromAddress, amount } = props;
    const { walletAddress } = userState[chatId];
    const transaction = await tronWeb?.transactionBuilder.sendTrx(walletAddress, tronWeb.toSun(amount), fromAddress);
    const signedTxn = await tronWeb?.trx.sign(transaction);
    const result = await tronWeb?.trx.sendRawTransaction(signedTxn);
    return { result: !!result, txid: result?.txid };
};
export default withDrawTRX;
