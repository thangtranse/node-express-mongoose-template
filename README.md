# Repo thần thánh!

# Giới thiệu

Đây là repo mẫu góp nhặt từ những kinh nghiệm triển khai các dự án và tham khảo các trang hướng dẫn khác (tôi có trích nguồn ở phần cuối).
Sơ sơ dự án gồm:

- Triển khai ExpressJS và router
- Kết nối MongoDb
- Kết nối Redis
- API:
   - Đăng ký tài khoản
   - Đăng nhập
   - Đăng xuất
   - Lấy lại token khi đã hết hạn (không cần đăng nhập lại)
   - Lấy danh sách User xác thực bằng Token
# Cấu hình hệ thống

1. Nodejs (upto v14.18.1)
1. Redis (i use v6.2.6)
1. MongoDb (i use v5.0.10): Bạn có thể tham khảo [repo](https://github.com/thangtranse/mongo) này để sử dụng `docker-image mongo`
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
Để có thể lấy `ACCESS_TOKEN_SECRET` và `REFRESH_TOKEN_SECRET` bạn hãy chạy `bash` bên dưới, sau đó dùng KEY nào cũng được cho 2 giá trị

```sh
node ./src/helpers/generate_key.js 
```

# Package

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

# Nguồn tham khảo

## 1. Từ nhà sản xuất
## 2. Từ Blog
1. https://www.youtube.com/c/TipsJavascript
1. https://anonystick.com/