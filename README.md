
## Assumptions

*

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## RestAPI

Full api is available via `OpenAPI` (swagger) portal `localhost:3000/api`.

## Test

```bash
# unit tests
$ npm run test
$ npm run test:debug
$ npm run test:cov

# integration tests
$ npm run test:e2e
$ npm run test:e2e:debug
$ npm run test:e2e:cov
```

> Note: `debug` commands allow attaching to process

## License

Nest is [MIT licensed](LICENSE).

## Docker


build
```
docker build -t employees-service .
```
> Note: docker support only `production` build

run
```
docker run -d \
    --name employees-service
    -p 3000:3000
    employees-service
```

## Feature

* Rest API
    * employees
* API validation
* Unit Test
* Integration Test
* SQLite - support state
* [Logger](./src/core/logger/README.md)
* [Configuration](./src/config/README.md)

### TODOS

* Authentication - add basic authentication middleware
* Health Check
* Error handling
