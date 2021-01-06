# BelleTix

A StubHub clone built as an exploration of several topics, including
- Microservice architecture and implementation
- Container management using Docker and Kubernetes
- Event emitters
- Typescript within React and Node.js environments
- Custom error handlers and middleware within an Express server
- Authorization and authentication strategies

More topics being added as development continues.

Note that this is built as part of [Steven Grider](https://www.udemy.com/course/microservices-with-node-js-and-react/#instructor-1)'s Udemy course [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/).

#### Resources
##### User
- email: required, string
- password: required, string, hashed
##### Ticket
##### Order
##### Charge

#### Services
##### Auth
Handles new user creation and, sessions and user authenication. User instances are stored in a Mongo database with passwords hashed using scrypt and randomBytes.
- GET /api/users/currentuser - returns logged in user if any
- POST /api/users/signup - validates request data, confirms uniqueness, hashes password and creates db entry
- POST /api/users/signin - performs authentication and creates user session
- POST /api/users/signout - destroys current session


##### Tickets
##### Orders
##### Expiration
##### Payments

### Changelog
[1/5/21] Initial commit. Auth service functional.
