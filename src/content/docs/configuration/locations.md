---
title: Locations configuration
description: Configuration reference for locations
---

The `[[services.<name>.locations]]` section defines reverse proxy routes that forward incoming requests to backend servers. Each location specifies a path pattern to match and a target backend to forward requests to.

## Parameters

### `source`

- **Type**: `String`
- **Required**: Yes
- **Description**: The path pattern to match incoming requests against. Use `/*` to match all paths under a given prefix. For example, `/api/*` matches `/api/users`, `/api/posts`, etc. Use `/*` at the root to match all requests.

### `target`

- **Type**: `String`
- **Required**: Yes
- **Description**: The backend server URL to forward matched requests to. Must be a complete URL including protocol (e.g., `http://192.168.1.10:8080`). Can reference a load balancer using the syntax `http://${loadbalancer_name}:port`.

### `headers`

- **Type**: `Headers`
- **Required**: No
- **Description**: HTTP header manipulation rules specific to this location. Can modify both request headers (sent to backend) and response headers (sent to client). These headers override service-level and server-level headers. See Headers reference for details.
