const express = require("express");
const redis = require("./redis");
const connectRabbitMQ = require("./rabbitmq");
const { placeBet } = require("./services/betting");
const { sendBetNotification } = require("./services/notification");

const app = express();
app.use(express.json());

let rabbitMQChannel;

async function initPlayerBalance(playerId, balance) {
    await redis.set(`player:${playerId}:balance`, balance);
}

app.post("/bet", async (req, res) => {
    const { playerId, betAmount } = req.body;

    try {
        const result = await placeBet(playerId, betAmount);
        await sendBetNotification(rabbitMQChannel, playerId, result);
        res.json({ message: "Bet placed successfully", result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(3000, async () => {
    console.log("Server running on http://localhost:3000");

    await initPlayerBalance("player1", 1000);
    rabbitMQChannel = await connectRabbitMQ();
    console.log("Connected to RabbitMQ");
});