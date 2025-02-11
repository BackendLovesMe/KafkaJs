const { Kafka } = require('./client');

async function init() {
    const admin = Kafka.admin();
    console.log('Admin Connected');
    try {
        await admin.connect({ timeout: 5000 });
        console.log("Admin connection success ...");

        const topicName = "rider-update";
        const topicExists = await admin.listTopics().then(topics => topics.includes(topicName));

        if (!topicExists) {
            await admin.createTopics({
                topics: [
                    {
                        topic: topicName,
                        numPartitions: 2,
                        replicationFactor: 1, // Adjust as needed!
                    },
                ],
            });
            console.log("Topic Created Successfully");
        } else {
            console.log(`Topic "${topicName}" already exists`);
        }

    } catch (error) {
        console.error("Error creating/checking topic:", error);
    } finally {
        console.log("Disconnecting admin ...");
        await admin.disconnect();
    }
}

init();