# BelleTix

A StubHub clone built as an exploration of several topics, including
- Microservice architecture and implementation
- Container management using Docker and Kubernetes
- Event emitters
- Typescript within React and Node.js environments
- Custom error handlers and middleware within an Express server
- Authorization and authentication strategies
- Server side rendering using Next.js
- Communicating between containers

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
Handles new user creation and, sessions and user authenication. User instances are stored in a Mongo database with passwords hashed using scrypt and randomBytes. Set up to run as a Docker container in Kubernetes

Errors are handled with cutsom error scripts

Implements custom middleware to route errors, apply validation to requests, confrim authorization/authentication
- GET /api/users/currentuser - returns logged in user if any
- POST /api/users/signup - validates request data, confirms uniqueness, hashes password and creates db entry
- POST /api/users/signin - performs authentication and creates user session
- POST /api/users/signout - destroys current session


##### Tickets
##### Orders
##### Expiration
##### Payments

### Changelog
[1/6/21]
- Extracted common features into npm library @mfrattaroli/common
- Set up front end rendered server-side to handle authorization
- Implemented testing with Jest / Supertest for Auth Server
  
[1/5/21]
- Built out login/logout functionality
- Initial commit. Auth service functional.
