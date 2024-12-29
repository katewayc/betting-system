const amqp = require("amqplib");

async function connectRabbitMQ() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return channel;
}

module.exports = connectRabbitMQ;