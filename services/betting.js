const redis = require("../redis");

async function placeBet(playerId, betAmount) {
    const balance = await redis.get(`player:${playerId}:balance`);

    if (!balance) {
        throw new Error("Player does not exist");
    }

    const currentBalance = parseFloat(balance);

    if (currentBalance < betAmount) {
        throw new Error("Insufficient balance");
    }

    const newBalance = currentBalance - betAmount;
    await redis.set(`player:${playerId}:balance`, newBalance);

    const isWin = Math.random() < 0.5;
    const winnings = isWin ? betAmount * 2 : 0;

    await redis.set(`player:${playerId}:balance`, newBalance + winnings);

    return {
        isWin,
        winnings,
        newBalance: newBalance + winnings,
    };
}

module.exports = { placeBet };