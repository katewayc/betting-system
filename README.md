# Betting System

A simple betting system built with **Node.js**, **Redis**, and **RabbitMQ** to demonstrate asynchronous programming and queue-based message processing.

## Features

- Allows users to place bets via an HTTP API.
- Uses **Redis** to manage user balances.
- Sends bet results to a **RabbitMQ** queue for notification handling.
- Demonstrates async/await and external service integration.

## Project Structure

```
betting_system/
├── services/
│   ├── betting.js       # Core betting logic
│   ├── notification.js  # (Optional for expansion) Notification service logic
├── app.js               # Entry point for the HTTP server
├── redis.js             # Redis connection configuration
├── rabbitmq.js          # RabbitMQ connection configuration
├── package.json         # Project metadata and dependencies
```

## Requirements

- **Node.js**: v14.x or later
- **Redis**: Installed and running on localhost (default port: 6379)
- **RabbitMQ**: Installed and running on localhost (default port: 5672)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd betting_system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure **Redis** and **RabbitMQ** are running locally.

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Use an HTTP client (e.g., Postman or cURL) to send a POST request to `http://localhost:3000/bet` with the following payload:
   ```json
   {
       "playerId": "player1",
       "betAmount": 500
   }
   ```

3. Example response:
   ```json
   {
       "message": "Bet placed successfully",
       "result": {
           "isWin": true,
           "winnings": 1000,
           "newBalance": 1500
       }
   }
   ```

4. Check the RabbitMQ management interface (http://localhost:15672) to view the messages in the `bet_notifications` queue.

## Project Configuration

- Redis connection is configured in `redis.js`:
  ```javascript
  const redis = new Redis({
      host: 'localhost',
      port: 6379,
  });
  ```
- RabbitMQ connection and queue setup are handled in `rabbitmq.js`:
  ```javascript
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  ```

## Future Improvements

- Add a consumer service for processing notifications from RabbitMQ.
- Implement better error handling and logging.
- Add authentication and user management.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
