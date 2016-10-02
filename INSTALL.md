# Installation

## Prerequisites

This software requires a valid NodeJS/NPM installation. Installation packages can be found on the [official website](https://nodejs.org).

Also, make sure you have Python and a compiler in your path. It can be required to build native modules during the dependencies installation step.

## Dependencies

To install dependencies, run the following command:

```shell
npm install --production
```

## Configuration

Copy the entire `config.sample` directory content to `config`. Make sure to customize each file to your needs.

## Logs

By default, logs are written to the `logs`. Make sure to create it or disable this output stream in the corresponding configuration file.

## Keys

For each token specified in the `config/tokens.js` file, copy or create the appropriate keys.

To create a basic ES256 key pair, you can use the OpenSSL CLI:

```shell
openssl ecparam -genkey -name secp256k1 -noout -out pkey.pem
openssl ec -in pkey.pem -pubout -out pub.pem
```

For ES512, use the `secp521r1` curve.

## Run

To run the main file, just run the following command on the root directory of this repository:

```shell
node .
```