from kafka import KafkaConsumer, KafkaProducer
import json
import time
import random

# Inicijalizacija Kafka consumera za čitanje podataka sa prvog topica
consumer = KafkaConsumer('topic1', bootstrap_servers='localhost:9092', group_id='my-group2', max_poll_records=5)

# Inicijalizacija Kafka producera za slanje obradjenih podataka na drugi topic
producer = KafkaProducer(bootstrap_servers='localhost:9092', acks='all')

# Kafka topic za slanje obradjenih podataka
output_topic = 'topic2'

# Inicijalizacija promenljive za praćenje primljenih podataka
received_data_count = 0
total_temperature = 0

# Obrada i slanje podataka
for message in consumer:
    weather_data = message.value.decode('utf-8')
    weather_data_json = json.loads(weather_data)

    # Dodaj primljene podatke u promenljive
    received_data_count += 1
    total_temperature += weather_data_json.get('main', {}).get('temp', 0)
    temperature = weather_data_json.get('main', {}).get('temp', 0)
    # Ovaj print se ispisuje u terminalu
    print(f"Poruka broj: {received_data_count} Temperatura: {temperature}")

    # Ako su primljene 3 poruke, izračunaj prosečnu temperaturu i pošalji dalje
    if received_data_count == 3:
        average_temperature = total_temperature / 3 + random.uniform(1, 10) if received_data_count > 0 else 0

        # Slanje obrađenih podataka na drugi Kafka topic
        processed_data = {'average_temperature': average_temperature}
        producer.send(output_topic, value=json.dumps(processed_data).encode('utf-8'))

        # Ispisivanje obrađenih podataka
        print(f"Prosečna temperatura: {average_temperature}")

        # Resetuj brojač i sumu temperature
        received_data_count = 0
        total_temperature = 0

# Zatvaranje consumera i producera (ova linija neće biti dostignuta u ovom primeru)
consumer.close()
producer.close()
