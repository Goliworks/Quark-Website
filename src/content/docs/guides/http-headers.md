---
title: HTTP Headers
description: Learn how to configure a reverse proxy in Quark
---

Quark allows you to manipulate HTTP headers at multiple levels, giving you fine-grained control over request and response headers. You can add, modify, or remove headers at the server, service, location, or file server level.

## Header manipulation basics

Headers can be manipulated in two ways:

- **set**: Add a new header or override an existing one
- **del**: Remove specific headers

For proxy locations, you can manipulate both **request headers** (sent to the backend) and **response headers** (sent to the client).

For file servers, you can only manipulate **response headers** (sent to the client when serving files).

### Server-level headers

Headers defined at the server level apply to all services using that server:

```toml
[servers.main.headers.locations]
request.set."X-Forwarded-Proto" = "https"
request.del = ["X-Custom-Header"]
response.set."X-Server" = "Quark"
response.del = ["Server"]

[servers.main.headers.file_servers]
set."X-Served-By" = "Quark"
del = ["Server"]
```

These headers apply to:

- All locations (proxy routes) in services using this server
- All file servers in services using this server

### Service-level headers

Headers defined at the service level apply to all locations and file servers within that service:

```toml
[services.my_app]
domain = "example.com"

[services.my_app.headers.locations]
request.set."X-App-Name" = "MyApp"
request.del = ["Cookie"]
response.set."X-Content-Type-Options" = "nosniff"
response.del = ["X-Powered-By"]

[services.my_app.headers.file_servers]
set."Cache-Control" = "public, max-age=3600"
del = ["ETag"]
```

Service-level headers override server-level headers if there's a conflict.

### Location-level leaders

Headers can be defined for individual proxy locations:

```toml
[[services.my_app.locations]]
source = "/api/*"
target = "http://192.168.1.10:8080"
headers.request.set."X-API-Key" = "secret-key"
headers.request.set."X-Real-IP" = "$remote_addr"
headers.request.del = ["Authorization"]
headers.response.set."X-API-Version" = "v2"
headers.response.del = ["X-Internal-Header"]
```

Location-level headers override service-level and server-level headers.

### File server-level headers

Headers can be defined for individual file servers:

```toml
[[services.my_site.file_servers]]
source = "/static/*"
target = "/var/www/static"
headers.set."Cache-Control" = "public, max-age=31536000, immutable"
headers.set."X-Content-Type-Options" = "nosniff"
headers.del = ["Server", "ETag"]
```

File server headers only affect response headers (you cannot modify request headers since there's no backend).

## Header priority and cascading

Headers cascade from the most general to the most specific level:

1. Server-level (applies to all services on that server)
2. Service-level (applies to all locations/file servers in that service)
3. Location/File server-level (applies only to that specific route)

More specific headers override more general ones. If a header is set at multiple levels, the most specific level wins.

```toml
[servers.main.headers.locations]
response.set."X-Frame-Options" = "DENY"
response.set."X-Server" = "Quark"

[services.my_app.headers.locations]
response.set."X-Server" = "MyApp"  # Overrides server-level
response.set."X-App-Version" = "1.0"

[[services.my_app.locations]]
source = "/api/*"
target = "http://192.168.1.10:8080"
headers.response.set."X-Server" = "API"  # Overrides service-level
headers.response.set."X-Rate-Limit" = "1000"
```

Final headers for requests to `/api/*`:

- `X-Frame-Options: DENY` (from server)
- `X-App-Version: 1.0` (from service)
- `X-Server: API` (from location, overrides service and server)
- `X-Rate-Limit: 1000` (from location)
