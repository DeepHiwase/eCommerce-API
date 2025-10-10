# Table of contents

* [Introduction](README.md)
* [Authentication](authentication.md)

## Guides

* [Rate Limiting](guides/rate-limiting.md)
* [Error Handling](guides/error-handling.md)

***

* ```yaml
  type: builtin:openapi
  props:
    models: true
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: e-commerce-api
  ```
