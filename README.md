# Repo basic!

# Introduction

This is a sample repository collected from the experience of implementing projects and referring to other tutorial pages (I have cited sources in the last section).
The project includes:

- [x] Implementing ExpressJS and router
- [x] Connecting to MongoDb
- [x] Connecting to Redis
- [x] Services:
  - [x] Register account
  - [x] Login/Logout
  - [x] Retrieve token when expired (no need to log in again)
  - [x] Get a list of User authenticated by Token
  - [x] Upload file

# System configuration

1. Nodejs (up to v14.18.1)
1. Redis (I use v6.2.6)
1. MongoDb (I use v5.0.10): You can refer to this [repo](https://github.com/thangtranse/mongo) to use the `docker-image mongo`

# ENV

```sh
PORT=3000

MONGO_URL_CONNECT_1=
MONGO_URL_CONNECT_2=

REDIS_PORT=6379
REDIS_HOST=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

To get `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`, please run the `bash` command below, then use any KEY for both values.

```sh
node ./src/helpers/generate_key.js
```

or

```sh
yarn token
```

# Extensions Node

1. [redis-commander](https://www.npmjs.com/package/redis-commander)

# References

### 1. From the manufacturer

### 2. From Blog

1. https://www.youtube.com/c/TipsJavascript
1. https://anonystick.com/
