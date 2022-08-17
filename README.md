# ExpressJS Project Template

# Intro

This is project template use expressJS, mongodb, Redis. It was full example for api user login, logout, refesh token.

# REQ

1. Nodejs (upto v14.18.1)
1. Redis (i use v6.2.6)
1. MongoDb (i use v5.0.10)

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

To get `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` when you run `bash` below, you can get other key for 2 varials.

```sh
node ./src/helpers/generate_key.js
```

# Package

1. NodeJs
1. ExpressJs
1. dotenv
1. http-errors
1. nodemon
1. joi
1. bcrypt
1. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
1. crypto
1. [ioredis](https://www.npmjs.com/package/ioredis)
1. [helmet](https://www.npmjs.com/package/helmet)
1. [morgan](https://www.npmjs.com/package/morgan)
1. [date-fns](https://www.npmjs.com/package/date-fns)
1. [compression](https://www.npmjs.com/package/compression):
1. [cors]():

# Extensions Node

1. [redis-commander](https://www.npmjs.com/package/redis-commander)

# Extensions vscode

1. REST Client

   - Id: humao.rest-client
   - Description: REST Client for Visual Studio Code
   - Version: 0.25.0
   - Publisher: Huachao Mao
   - VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=humao.rest-client

2. Import Cost

   - Id: wix.vscode-import-cost
   - Description: Display import/require package size in the editor
   - Version: 3.3.0
   - Publisher: Wix
   - VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost

# Server-sent-events (SSE)

[Go to branch](thangtranse/node-express-mongoose-template/tree/server-sent-events)

## 1. Intro

## 2. REF - Blog

1. https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app

# REF

## Blog

1. https://www.youtube.com/c/TipsJavascript
1. https://anonystick.com/
