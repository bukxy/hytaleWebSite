Laravel project combined with react for future website of hytale server.

login connection with game server
news system
vote with rewards
shop ?
stats (KDA, and more if possible) maybe a java plugin needed
map
wiki

Discord bot ?


## 🐳 Docker
[Documentation docker](https://docs.docker.com/manuals/)

---
### ⚙️ Commands DEV

### 📄 First install
```bash
docker compose up -d --build
```
#### 🔄 Re build
```bash
docker compose up -d --build
```
#### ▶️ Start
```bash
docker compose up -d 
```
#### ⏹️ Stop containers
```bash
docker compose down
```

#### 🔄 Reset database and execute seeders
```bash
docker compose run --rm app php artisan migrate:fresh --seed
```

---
### ⚙️ Commands PROD (WIP)

### 📄 First install
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build    
```
#### 🔄 Re build
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build 
```
#### ▶️ Start
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d 
```
#### ⏹️ Stop containers
```bash
docker compose down
```