# TwitterClone

Backend of clone of Twitter (Node.JS, Nest.JS, TypeScript, TypeORM), with features: register/login user, create/delete post, create/delete comment, like/unlike, follow/unfollow and feed.

It is designed for relational DB, tested on PostgreSQL.

Postman collection is provided to test Twitter Clone API.postman_collection.json.

Example of .env file (should be placed to root of the project and should contain connection properties): 

PORT=3000
JWT_SECRET=mysecretkey
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=nestjs_auth

