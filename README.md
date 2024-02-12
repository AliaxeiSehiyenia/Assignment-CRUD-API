# Simple CRUD API

Task is [link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).

## 💻 How to install

Clone and install packages

```
npm i
```

## 🚀 How to run

Run the application in development mode

```
npm run start:dev
```

Run the application in production mode

```
npm run start:prod
```
Run cluster mode with default load balancer and one in-memory-database for all workers

```
npm run start:multi
```

In console you can watch which worker response on the request. Workers should round-robin and data from database should be consistent for all workers.

## 💥 API

Implemented endpoint: `api/users`

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id (uuid)

`POST api/users` - to create record about new user and store it in database

`PUT api/users/${userId}` - to update existing user (**all fields required**)

`DELETE api/users/${userId}` - to delete existing user from database

### User's mandratory fields

`username` — user's name (string, **required**)

`age` — user's age (number, **required**)

`hobbies` — user's hobbies (array of strings or empty array, **required**)

## 💥 Postman

You can find Postman collection with all relized API requests in the root of the repository.