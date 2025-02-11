const { kafka } = require("./client");

async function init() {
    try {
        const consumer = kafka.consumer({ groupId: "user-1" });

        await consumer.connect();
        await consumer.subscribe({ topic: 'rider-updates', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => { // Corrected syntax
                console.log(`[${topic}]:PART:${partition}: ${message.value.toString()}`);
            },
        });
    } catch (error) {
        console.error("Error during consumer execution:", error);
    } finally {
        try {
            await consumer.disconnect();
            console.log("Consumer disconnected");
        } catch (disconnectError) {
            console.error("Error during consumer disconnection:", disconnectError);
        }
    }
}

init();
