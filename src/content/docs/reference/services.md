---
title: Services configuration
description: Configuration reference for services
---

The `[services.<name>]` section defines individual services that Quark will handle. Each service corresponds to a domain and can include reverse proxy locations, static file servers, redirections, and TLS configuration. At least one location, file server, or redirection must be defined for each service.

## Parameters

### `domain`

- **Type**: `String`
- **Required**: Yes
- **Description**: The public domain name for this service. This is how Quark identifies which service should handle incoming requests. Can be specified with or without the `www` subdomain to control automatic _www redirection_ behavior (e.g., `example.com` redirects _www_ to _non-www_ and `www.example.com` redirects _non-www_ to _www_).

### `server`

- **Type**: `String`
- **Required**: No
- **Default**: `main`
- **Description**: Name of the server (defined in `[servers.<name>]`) to associate with this service. If not specified, the service uses the default `main` server.

### `locations`

- **Type**: `Array<Location>`
- **Required**: No
- **Description**: list of reverse proxy locations. Each location defines a route pattern and target backend. See Locations reference for details.

### `file_server`

- **Type**: `Array<FileServer>`
- **Required**: No
- **Description**: Description: List of static file server configurations. Each file server defines a route pattern and local directory to serve. See File Servers reference for details.

### `redirections`

- **Type**: `Array<Redirection>`
- **Required**: No
- **Description**: List of URL redirections. Each redirection defines a source pattern and target URL. See Redirections reference for details.

### `tls`

- **Type**: `Tls`
- **Required**: No
- **Description**: Description: TLS/HTTPS configuration including certificate, key, and redirection settings. When configured, HTTPS is enabled on the server's https_port. See TLS Options reference for details.

### `headers`

- **Type**: `Headers`
- **Required**: No
- **Description**: HTTP header manipulation rules that apply to all locations and file servers in this service. These headers are applied at the service level and can override server-level headers or be overridden by location-level headers. See Headers reference for details.
