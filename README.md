# HANLO API

## Installation

Makesure you have install npm and NodeJs

### 1. Clone

### 2. Go to the project directory

### 3. Run this

```bash
npm install
```

### 4. Create your mysql database

### 5. Create ./.env

```
NODE_ENV=development
PORT=3000

DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD

JWT_ENCRYPTION=YOUR_JWT_SECRET
JWT_EXPIRATION=86400
```

### 6. Create ./server/config/config.json

```json
{
  "development": {
    "username": "YOUR_SQL_USERNAME",
    "password": "YOUR_SQL_PASSWORD",
    "database": "YOUR_SQL_DB_NAME",
    "host": "YOUR_SQL_LOCATION(127.0.0.1/localhost)",
    "dialect": "mysql"
  }
}
```
