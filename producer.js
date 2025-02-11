const { Kafka } = require("kafkajs");
const { Partitioners } = require('kafkajs')

const { kafka } = require('./client');

async function init() {
    let producer; // Declare producer outside the try block
    try {
        producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
        console.log('Connecting Producer');
        await producer.connect();
        console.log("Producer Connected Successfully");
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: 0,
                    key: "location-update",
                    value: JSON.stringify({ name: 'Akshat', loc: "North" })
                },
            ],
        });
        console.log("Message sent successfully");
    } catch (error) {
        console.error("Error sending message:", error);
    } finally {
        try {
            if (producer) { // Check if producer is defined
                await producer.disconnect();
                console.log("Producer disconnected");
            }
        } catch (disconnectError) {
            console.error("Error disconnecting producer:", disconnectError);
        }
    }
}

init();
