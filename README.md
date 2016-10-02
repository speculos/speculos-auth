# Speculos - Auth

This repository holds the authentication module of [Speculos](https://github.com/speculos/speculos).

For more information about the exposed REST API, please refer to the [REST.yml](REST.yml). This file comply with the OpenAPI specification.

For installation instructions, please refer to the [INSTALL.md](INSTALL.md) file.

## Administration

### Database initialization

To initialize the database, you can use the `initDb` tool rather than creating it manually:

```shell
node tools/initDb
```

Please refer to the help page of this command for detailed usage information:

```shell
node tools/initDb --help
```

### Users management

User accounts can be managed by calling specific administration endpoints (categorized as `Administration` in the REST API documentation). Those endpoints must be called with an administration token. This token can be created with the following call:

```shell
node tools/createToken -a
```

Please refer to the help page of this command for detailed usage information:

```shell
node tools/createToken --help
```

## Tests

The authentication server can be tested against the test suite present in this repository. To do so, you need to follow the steps described below.

### Dependencies

Just run the following command to install development dependencies:
```shell
npm install
```

### Configuration

Before running the test suite, you have to provide input data.

For that purpose, copy the `test/data.sample` directory to `test/data` and edit each file.
Each data file is thoroughly commented. Just follow the instructions.

As the server depends on a MongoDB instance, you need to populate the database with data according to the test values you entered.
For better efficiency, use the API to initialize the tests data before modifying the code.

### Run

Once configured, just run the following command:

```shell
mocha
```