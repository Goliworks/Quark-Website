---
title: TLS/HTTPS
description: Learn how to configure a reverse proxy in Quark
---

Quark provides built-in HTTPS support with automatic HTTP to HTTPS redirection. HTTPS is configured at the service level and works with reverse proxy, load balancing, and static file serving.

## Basic HTTPS configuration

To enable HTTPS for a service, specify the paths to your TLS certificate and private key:

```toml
[services.my_app]
domain = "example.com"
tls.certificate = "/etc/ssl/certs/example.com.crt"
tls.key = "/etc/ssl/private/example.com.key"
```

With this configuration:

- HTTPS is available on port 443 (default)
- HTTP/2 is automatically enabled for HTTPS connections

### Automatic HTTP to HTTPS redirection

By default, Quark automatically redirects HTTP requests to HTTPS when TLS is configured.
When a user visits `http://example.com`, they are automatically redirected to `https://example.com`.

To disable automatic redirection:

```toml
[services.my_app]
domain = "example.com"
tls.certificate = "/etc/ssl/certs/example.com.pem"
tls.key = "/etc/ssl/private/example.com.key"
tls.redirection = false
```

## Multiple services with HTTPS

Each service can have its own TLS certificate:

```toml
[services.app1]
domain = "app1.com"
tls.certificate = "/etc/ssl/certs/app1.com.crt"
tls.key = "/etc/ssl/private/app1.com.key"

[[services.app1.locations]]
source = "/*"
target = "http://192.168.1.10:8080"

[services.app2]
domain = "app2.com"
tls.certificate = "/etc/ssl/certs/app2.com.crt"
tls.key = "/etc/ssl/private/app2.com.key"

[[services.app2.locations]]
source = "/*"
target = "http://192.168.1.20:9000"
```

Quark uses SNI (Server Name Indication) to serve the correct certificate based on the requested domain.

### Sharing certificates between services

Multiple services can share the same certificate if it includes all their domains (using SAN - Subject Alternative Names):

```toml
[services.app1]
domain = "app1.com"
tls.certificate = "/etc/ssl/certs/shared.crt"
tls.key = "/etc/ssl/private/shared.key"

[[services.app1.locations]]
source = "/*"
target = "http://192.168.1.10:8080"

[services.app2]
domain = "app2.com"
tls.certificate = "/etc/ssl/certs/shared.crt"
tls.key = "/etc/ssl/private/shared.key"

[[services.app2.locations]]
source = "/*"
target = "http://192.168.1.20:9000"
```

### Wildcard certificates

Quark supports wildcard certificates, allowing you to secure multiple subdomains with a single certificate:

```toml
[services.api]
domain = "api.example.com"
tls.certificate = "/etc/ssl/certs/wildcard.example.com.crt"
tls.key = "/etc/ssl/private/wildcard.example.com.key"

[[services.api.locations]]
source = "/*"
target = "http://192.168.1.10:8080"

[services.app]
domain = "app.example.com"
tls.certificate = "/etc/ssl/certs/wildcard.example.com.crt"
tls.key = "/etc/ssl/private/wildcard.example.com.key"

[[services.app.locations]]
source = "/*"
target = "http://192.168.1.20:9000"

[services.admin]
domain = "admin.example.com"
tls.certificate = "/etc/ssl/certs/wildcard.example.com.crt"
tls.key = "/etc/ssl/private/wildcard.example.com.key"

[[services.admin.locations]]
source = "/*"
target = "http://192.168.1.30:3000"
```

A wildcard certificate for `*.example.com` can secure any subdomain under `example.com`.
