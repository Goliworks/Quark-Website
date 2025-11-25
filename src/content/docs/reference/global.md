---
title: Global configuration
description: Global configuration reference
---

The `[global]` section contains server-wide settings that apply to all servers and services in your Quark configuration. This section is optional—if not specified, default values are used.

## Parameters

### `backlog`

- **Type**: `Integer`
- **Required**: No
- **Default**: `4096`
- **Description**: Maximum number of pending connections the server can queue. This determines how many connection requests can wait while the server is busy processing other requests.

### `max_connections`

- **Type**: `Integer`
- **Required**: No
- **Default**: `1024`
- **Description**: Maximum number of simultaneous client connections allowed across all servers. Once this limit is reached, new connection attempts will be rejected until existing connections are closed.

### `max_requests`

- **Type**: `Integer`
- **Required**: No
- **Default**: `100`
- **Description**: Maximum number of simultaneous HTTP requests the server can process. This limits concurrent request handling to prevent resource exhaustion.

### `keepalive`

- **Type**: `Boolean`
- **Required**: No
- **Default**: `true`
- **Description**: Enable or disable HTTP keep-alive connections. When enabled, connections remain open between requests, reducing latency and improving performance for clients making multiple requests.

### `keepalive_timeout`

- **Type**: `Integer`
- **Required**: No
- **Default**: `60`
- **Description**:Timeout in seconds for HTTP keep-alive connections. After this period of inactivity, the connection will be closed. Only applies when `keepalive` is enabled.

### `keepalive_interval`

- **Type**: `Integer`
- **Required**: No
- **Default**: `20`
- **Description**: Interval in seconds between HTTP keep-alive probes. The server sends probes to detect if the client is still connected. Only applies when `keepalive` is enabled.

## Example

Basic global configuration:

```yaml
[global]
backlog = 4096
max_connections = 1024
max_requests = 100
keepalive = true
keepalive_timeout = 60
keepalive_interval = 20
```
