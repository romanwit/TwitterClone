# TwitterClone

A backend implementation of a Twitter clone using **Node.js**, **NestJS**, **TypeScript**, and **TypeORM**. This project provides core social media features, including:

- User registration and authentication (JWT-based login)
- Creating and deleting posts
- Creating and deleting comments
- Liking and unliking posts
- Following and unfollowing users
- Generating a personalized feed

## Database

The backend is designed for a relational database and has been tested with **PostgreSQL**.

## Setup and Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (latest LTS recommended)
- **PostgreSQL**
- **npm** or **yarn**

### Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/romanwit/TwitterClone.git
   cd TwitterClone
   ```

2. Install dependencies:

   ```sh
   npm install  # or yarn install
   ```

3. Configure environment variables:
Create a .env file in the root of the project with the following content (example):

   ```ini
   PORT=3000
   JWT_SECRET=mysecretkey
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=yourpassword
   DB_NAME=nestjs_auth
   ```

4. Start the development server:

   ```sh
   npm run start:dev
   ```

## API Documentation

A Postman collection is provided for testing the API:
Twitter Clone API.postman_collection.json
