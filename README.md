# KafkaJs
Repository  for Kafka implementations

steps to start working with kafaka : docker run -p 2181:2181 --name zookeeper  
then start Kafka : docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=ip:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://ip:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
