# Application Summary
This is a boilerplate application for the MERN stack. The application itself is a basic Todo app and incorporates a Docker development environment and Mocha + Chai testing for the Express Server.

# TODO
- Add Jest for testing the front-end
- Add Passport for user sessions

# Running in Development
Add a `.env` file to the project root containing the `MONGO_HOSTNAME`, `MONGO_DB`, and `MONGO_PORT`.

## Starting Docker
### Build Docker Images
`docker-compose -f dev-docker-compose.yml build`
### Run Docker Containers
`docker-compose -f dev-docker-compose.yml up`
### Build and Run
`docker-compose -f dev-docker-compose.yml up --build`