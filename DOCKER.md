# Docker

This file describe how to run and use the dockerized version of speculos-auth.
To run the entire speculos stack, view [TODO].

Docker-compose is used to run a mongodb container and the speculos-auth
container on the same network. Inside the speculos-auth container, the mongod
instance is listening on the `mongodb` host. The recommended config url is
`mongodb://mongodb/auth`.


## Development environment

All sources files are mounted as volumes, and the application is launched with
`nodemon`. This allow to edit files without rebuilding the docker image.

The mongoDb container is accessible as `localhost:27017` from the host.


#### Build

    docker-compose build

#### Run

The following environment variables must be set (either on the shell or on a .env file)

    EXTERNAL_PORT
    DATABASE_DIR

Run the service with the `docker-compose up` command

    EXTERNAL_PORT=8001 DATABASE_DIR=../db docker-compose up

#### Attaching a terminal to the container

    docker-compose exec speculos-auth /bin/bash

#### Database initialization

    docker-compose exec speculos-auth node tools/initDb.js



## Production environment

Only `config`, `keys`, `logs` and `db` folders are mounted as volumes. The
mongoDb instance is not accessible from the host.

[TODO launch app with a process manager]

#### Build

    docker-compose -f docker-compose.prod.yml build

#### Run

    EXTERNAL_PORT=8001 DATABASE_DIR=../db docker-compose -f docker-compose.prod.yml up

#### Deploy

    [TODO (with docker-machine)]
