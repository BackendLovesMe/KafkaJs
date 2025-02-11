const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ["10.16.32.144:9092"],
    connectionTimeout: 10000,       // Increased timeout
    authenticationTimeout: 10000,
});

module.exports = { kafka };
