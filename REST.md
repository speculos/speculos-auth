# Speculos - Wrapper - REST

This API description comply with the OpenAPI v2.0 specifications.

## Tools

A typical consumer of OpenAPI v2.0 is [Swagger](http://swagger.io).

The [REST.yml](REST.yml) file of this repository can be read by various tools. We recommend the free and easy-to-use [Swagger editor](http://editor.swagger.io). Just open the YML file in the editor to browse the API documentation.

## Design

### Tokens

The tokens used by this API follows the [JWT draft proposal](https://tools.ietf.org/html/rfc7519). Those tokens allows for a fully decentralized and secure partnership between extraneous components.

### Errors

The whole API uses the standard HTTP status codes. Because of they restrained number, we introduced a common `Error` object. This object holds a `code` property. The possible values of this property are thoroughly documented in the API. Use them wisely.