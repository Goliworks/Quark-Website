---
title: Reverse Proxy
description: Learn how to configure a reverse proxy in Quark
---

Quark acts as a reverse proxy by forwarding incoming HTTP/HTTPS requests to one or more backend servers. This allows you to route traffic based on domains and paths while handling TLS termination at the proxy level.

## Basic configuration

To configure a reverse proxy, you need to define a service with at least one location that specifies where to forward requests.

```toml
[services.my_app]
domain = "example.com"

[[services.my_app.locations]]
source = "/*"
target = "http://192.168.1.10:8080"
```

This configuration will:

- Listen for requests to example.com
- Forward all paths (/\*) to the backend server at http://192.168.1.10:8080

## Path-based routing

You can define multiple locations to route different paths to different backends:

```toml
[[services.my_app.locations]]
source = "/api/*"
target = "http://192.168.1.10:8080"

[[services.my_app.locations]]
source = "/admin/*"
target = "http://192.168.1.20:9000"

[[services.my_app.locations]]
source = "/*"
target = "http://192.168.1.30:3000"
```

Quark will match requests in the order they are defined, so place more specific routes before general ones.

## Multiple services

You can host multiple services on the same Quark instance by defining multiple service sections:

```toml
[services.app1]
domain = "app1.com"

[[services.app1.locations]]
source = "/*"
target = "http://192.168.1.10:8080"

[services.app2]
domain = "app2.com"

[[services.app2.locations]]
source = "/*"
target = "http://192.168.1.20:9000"
```

Each service is identified by its domain name, allowing Quark to route requests to the appropriate backend.
