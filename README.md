# KIB backend task
CRUD (Create, Read, Update, Delete) application that consumes the TMDB APIs. Your
task is to store and sync the data in a database and create a way to interact with it.
You can create a free account on https://www.themoviedb.org/ and get an API key to start using
these APIs.

## Seeding Data (users, geners, movies)
> seeding these 3 tables because others Favorite & ratings depends on them
seeding geners, movies will call TMDB `geners` API and Populare `movies` API and fill there tables
Docker will run seeds script then serve main app script
>


## Installation
```bash
$ yarn install
```

## Running the app
###  In case using not using Docker you must change .env PG_HOST=127.0.0.1
```bash
# using Docker compose
$ docker-compose up --build

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# seeding data
$ yarn run seed
```

## Test
```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## API
> `Note! Port is 3000 in case not using docker-compose`
http://localhost:8080

## Swagger
> `Note! Port is 3000 in case not using docker-compose`
http://localhost:8080/docs

# Thanks

