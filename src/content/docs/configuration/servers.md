---
title: Servers configuration
description: Configuration reference for servers
---

The `[servers.<name>]` section defines individual server instances with their own port configurations and settings. A default server named "main" is always created automatically, even if not explicitly defined in the configuration file.

## Parameters

### `port`

- **Type**: `Integer`
- **Required**: No
- **Default**: `80`
- **Description**: Port used for HTTP connections. This is where the server listens for incoming HTTP requests.

### `https_port`

- **Type**: `Integer`
- **Required**: No
- **Default**: `443`
- **Description**: Port used for HTTPS connections. This is where the server listens for incoming HTTPS requests when TLS is configured for services.

### `proxy_timeout`

- **Type**: `Integer`
- **Required**: No
- **Default**: `60`
- **Description**: Timeout in seconds for forwarding requests to backend servers. If a backend doesn't respond within this time, the request will fail with a timeout error.

### `headers`

- **Type**: `Headers`
- **Required**: No
- **Description**: HTTP header manipulation rules that apply to all services using this server. These headers are applied at the server level and can be overridden by service-level or location-level headers. See Headers reference for details.

## Examples

### Default server configuration

The `main` server is created automatically with default values. You can explicitly configure it to customize its behavior:

```toml
[servers.main]
port = 80
https_port = 443
proxy_timeout = 60
```

### Custom ports

Configure a server to use non-standard ports:

```toml
[servers.main]
port = 8080
https_port = 8443
proxy_timeout = 30
```

### Multiple servers

Define multiple servers for different purposes:

```toml
[servers.main]
port = 80
https_port = 443
proxy_timeout = 60

[servers.internal]
port = 8080
https_port = 8443
proxy_timeout = 120

[services.public_site]
domain = "example.com"
server = "main"

[[services.public_site.locations]]
source = "/*"
target = "http://192.168.1.10:8080"

[services.admin_panel]
domain = "admin.example.com"
server = "internal"

[[services.admin_panel.locations]]
source = "/*"
target = "http://192.168.1.20:9000"
```

## Notes

- The `main` server is always available by default. If you don't define any servers, `main` will be created with default values.
- Services without an explicit `server` parameter will automatically use the `main` server.
- Multiple servers allow you to separate concerns, such as having different port configurations or timeout values for public-facing and internal services.
- Server-level headers apply to all services that use this server but can be overridden at the service or location level. See Headers reference for the complete cascading behavior.
