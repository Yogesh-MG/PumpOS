# <h1 style="color: green">Welcome bois for the Glorious PumpOS</h1>

## To view Frontend for PUMPOS
In The Bash terminal Run the following commands to run the application 
```bash 
./front.sh
./app.sh
./backend.sh
```

## Using docker-compose
Step 1: Build The Mtorch 
```bash
docker build -t mtorch:latest .
```

Step 2: build the .env file
```bash
./env.sh
```

Step 3: Build the docker compose
```bash
docker-compose up --build
```
