# RestApi_Auth_Typescript_Init

The main API has the following endpoints:

- `POST /api/auth/register`: Register a new user account.
- `POST /api/auth/login`: Authenticate a user and generate an access token.
- `GET /api/users`: Get a list of all users (requires authentication).
- `GET /api/users/:id`: Get a user by ID (requires authentication). 
- `PUT /api/users/:id`: Update a user by ID (requires authentication). //patch
- `DELETE /api/users/:id`: Delete a user by ID (requires authentication).

## Technologies Used

- TypeScript
- Express.js
- MongoDB
- crypto
- Mongoose for MongoDB object modeling

---

# Conclusion

In conclusion, this project aimed to provide an example of how to implement authentication in a TypeScript-based RESTful API.
Throughout the project, I covered a range of topics, 
including user registration and login, password hashing and salting, token-based authentication, and middleware usage.
