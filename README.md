# Uputstva za Instalaciju i Pokretanje Projekta

## Instalacija Virtuelne Mašine i Ubuntu-a
Pogledajte ovaj [video klip](https://www.youtube.com/watch?v=rJ9ysibH768) za instalaciju Virtuelne Mašine i Ubuntu-a.

## Instalacija Apache Kafka
1. Posetite [zvaničnu stranicu za preuzimanje Apache Kafka](https://kafka.apache.org/downloads) i preuzmite verziju Scala 2.13.
2. Izvršite sledeće komande u terminalu:

   ```bash
   sudo apt update
   sudo apt install default-jre
   sudo apt install python3
   sudo apt-get -y install python3-pip
   python3 --version
   cd Downloads
   ls
   tar -xzf kafka_2.13-3.6.1.tgz
   nano ~/.bashrc

U otvorenom fajlu ~/.bashrc, dodajte sledeću liniju na kraju fajla:
**export PATH="$PATH:/home/student/kafka_2.13-3.6.1/bin"**
Sačuvajte promene pritiskom na Ctrl+S, a zatim pritisnite Ctrl+X da zatvorite editor. Nastavite sa sledećim komandama:
    
    cd kafka_2.13-3.6.1
    ls bin

## Pokretanje Apache Kafka

Otvorite dva terminala na putanji gde ste instalirali Kafka. To bi trebalo da bude Downloads/kafka_2.13-3.6.1.

U prvom terminalu pokrenite ZooKeeper:

    bin/zookeeper-server-start.sh config/zookeeper.properties

U drugom terminalu pokrenite Kafka server:

    bin/kafka-server-start.sh config/server.properties


## Pokretanje Projekta

Kreirajte folder **rnaep** u Documents folderu i pulujte ovaj projekat unutar tog foldera.
Otvorite projekat u Visual Studio Code-u.
Izvršite sledeće komande u terminalu projekta:

    pip install kafka-python
    npm i
    cd front
    npm i
    cd ..

Pokrenite sledeće komande u zasebnim terminalima:

Terminal 1: 

    python3 producer.py
Terminal 2: 

    node server.js
Terminal 3: 

    python3 consumer.py
Terminal 4: 

    cd front && npm start
Terminal 1: 

    python3 producer.py
    python3 producer.py
    python3 producer.py
    python3 producer.py
