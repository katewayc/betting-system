async function sendBetNotification(channel, playerId, result) {
    const queue = "bet_notifications";
    await channel.assertQueue(queue);

    const message = {
        playerId,
        isWin: result.isWin,
        winnings: result.winnings,
        balance: result.newBalance,
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log("Bet notification sent:", message);
}

module.exports = { sendBetNotification };