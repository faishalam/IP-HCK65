# API Documentation

## Models

### User

```md
- username : string, required
- email : string, required, unique, isEmail
- password : string, required
```

### Article

```md
- author : string, required
- title : string, required
- description : string, required
- url : string, required
- urlToImage : string, required
- publishedAt : date, required
- content : string, required
- authorId : integer, required
```

### Order

```md
- orderId : string, required
- userId : integer, required 
- token : string, required
- paidDate: date, required
```

## Relationship

### Many-to-Many

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`


Routes below need authentication:

- `GET /users/me`
- `PATCH /users/me/upgrade`
- `GET /payment/midtrans/initiate`


Routes below need authentication & authorization:
- `GET /`
- `GET /myarticles`
- `POST /articles`
- `DELETE /articles/:id`
- `PUT /articles/:id`
- `GET /myarticles/:id`


## POST /register

Request

- body:

```json
{
  "username":"string",
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "username": "integer",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## POST /login

Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## GET /users/me

Description:

- Fetch all users from database

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
{
    "id":"integer",
    "email":"email",
    "role":"role"
}
```

## PATCH /users/me/upgrade

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

response(200 -OK)
```json
{
    "message" : "Upgrade account success"
}
```

response(400 - badrequest)
```json 
{
    "message" : "Transaction is not success"
}
```

## GET /`

Description:

- Fetch all articles from api and database

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
{
    "status": "ok",
    "totalResults": 18518,
    "articles": [
        {
            "source": {
                "id": "bbc-news",
                "name": "BBC News"
            },
            "author": "https://www.facebook.com/bbcnews",
            "title": "Aleksandar Vucic: The man who remade Serbia",
            "description": "Aleksandar Vucic has dominated Serbian politics but rivals see elections as a first step in removing him.",
            "url": "https://www.bbc.co.uk/news/world-europe-67654166",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/510A/production/_131964702_a489747132ec8a925dc15a8eafd505aed284d3300_282_6000_33751000x563.jpg",
            "publishedAt": "2023-12-10T03:06:45Z",
            "content": "Aleksandar Vucic has dominated Serbian politics for the past decade, first as prime minister and later as president. \r\nTo supporters he is a pragmatic leader who overcame Serbia's deep divides and pr… [+7192 chars]"
        },
    ]
}
  ...,

```

## GET /myarticles

Description:

- Fetch all articles from databse

### Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
    {
        "id": 8,
        "author": "admin",
        "title": "Prabowo kalahkan aniasdfaes!",
        "description": "anies menang asdftapi",
        "url": "https://www.cnnindasdfdaonesia.com/nasional/20231221071617-617-1039982/ganjar-mengaku-sudah-tahu-sejak-awal-jk-dukung-anies-di-pilpres-2024",
        "urlToImage": "https://akcdn.detik.dafsdafnet.id/visual/2023/12/13/ganjar-pranowo-2_169.jpeg?w=650&q=90",
        "publishedAt": "2023-12-21T11:43:37.505Z",
        "content": "hahahahadasfdasfa",
        "authorId": 1,
        "createdAt": "2023-12-21T11:44:33.670Z",
        "updatedAt": "2023-12-21T13:25:35.139Z",
        "User": {
            "username": "admin"
        }
    },
]
```

## POST /articles

Description:

- Create articles

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (201 - Created)

```json
[
    {
        "id": 8,
        "author": "admin",
        "title": "Prabowo kalahkan aniasdfaes!",
        "description": "anies menang asdftapi",
        "url": "https://www.cnnindasdfdaonesia.com/nasional/20231221071617-617-1039982/ganjar-mengaku-sudah-tahu-sejak-awal-jk-dukung-anies-di-pilpres-2024",
        "urlToImage": "https://akcdn.detik.dafsdafnet.id/visual/2023/12/13/ganjar-pranowo-2_169.jpeg?w=650&q=90",
        "publishedAt": "2023-12-21T11:43:37.505Z",
        "content": "hahahahadasfdasfa",
        "authorId": 1,
        "createdAt": "2023-12-21T11:44:33.670Z",
        "updatedAt": "2023-12-21T13:25:35.139Z",
        "User": {
            "username": "admin"
        }
    },
]
```

Response (400 - Bad Request)

```json
{
  "message": "Author is required"
}
OR
{
  "message": "Title is required"
}
OR
{
  "message": "description is required"
}
OR
{
  "message": "url is required"
}
OR
{
  "message": "urlToImage is required"
}
OR
{
  "message": "content is required"
}
OR
{
  "message": "authorId is required"
}
```

## DELETE /articles/:id

Description:

- Delete articles from databse
- Authorization : articles ownership

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "success delete"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

Response (403 - Not Found)

```json
{
  "message": "You are not have permission"
}
```

## PUT /articles/:id

Description:

- Delete articles from databse
- Authorization : articles ownership

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Request

- body:

```json

    {
        "id": 8,
        "author": "admin",
        "title": "Prabowo kalahkan aniasdfaes!",
        "description": "anies menang asdftapi",
        "url": "https://www.cnnindasdfdaonesia.com/nasional/20231221071617-617-1039982/ganjar-mengaku-sudah-tahu-sejak-awal-jk-dukung-anies-di-pilpres-2024",
        "urlToImage": "https://akcdn.detik.dafsdafnet.id/visual/2023/12/13/ganjar-pranowo-2_169.jpeg?w=650&q=90",
        "publishedAt": "2023-12-21T11:43:37.505Z",
        "content": "hahahahadasfdasfa",
        "authorId": 1,
    },

```

Response (200 - OK)

```json
{
    "message": "lodging with name undefined has been update"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

Response (403 - Not Found)

```json
{
  "message": "You are not have permission"
}
```

## GET /myarticles/:id

Description:

- Fetch articles from databse by id

### Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
    "id": 11,
    "author": "admin",
    "title": "Prabowo aniedsfsdfs!",
    "description": "anies menang tapi",
    "url": "https://www.cnnindonesia.com/nasional/20231221071617-617-1039982/ganjar-mengaku-sudah-tahu-sejak-awal-jk-dukung-anies-di-pilpres-2024",
    "urlToImage": "https://akcdn.detik.net.id/visual/2023/12/13/ganjar-pranowo-2_169.jpeg?w=650&q=90",
    "publishedAt": "2023-12-21T11:44:48.575Z",
    "content": "hahahadsfsdha",
    "authorId": 1,
    "createdAt": "2023-12-21T11:44:50.316Z",
    "updatedAt": "2023-12-21T15:32:20.774Z"
}
```

Response (404 - Not Found)

```json
{
  "message": "Id not found"
}
```