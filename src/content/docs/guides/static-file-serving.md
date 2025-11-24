---
title: Static file serving
description: Learn how to configure a reverse proxy in Quark
---

Quark can serve static files directly from the filesystem, eliminating the need for a separate web server. This is ideal for hosting static websites, Single Page Applications (SPAs), or serving assets like images, CSS, and JavaScript files.

## Basic file serving

To serve files from a directory, use a file server configuration:

```toml
[services.my_app]
domain = "example.com"

[[services.my_app.file_servers]]
source = "/assets/*"
target = "/var/www/assets"
```

This configuration serves all files from `/var/www/assets` when accessing `example.com/assets/\*`.

For example:

- Request: `https://example.com/assets/style.css`
- Serves: `/var/www/assets/style.css`

## Serving a static website

To serve a complete static website with automatic index.html handling:

```toml
[services.my_site]
domain = "example.com"

[[services.my_site.file_servers]]
source = "/*"
target = "/var/www/mysite"
```

This configuration:

- Serves files from `/var/www/mysite` for all paths
- Automatically serves `index.html` when accessing directory
- **Example**: `example.com/` serves `/var/www/mysite/index.html`

### Custom 404 page

You can specify a custom 404 error page:

```toml
[[services.my_site.file_servers]]
source = "/*"
target = "/var/www/mysite"
custom_404 = "/var/www/mysite/404.html"
```

## Single Page Application (SPA)

SPAs require all routes to serve the same `index.html` file (for client-side routing):

```toml
[services.my_app]
domain = "app.example.com"

[[services.my_app.file_servers]]
source = "/*"
target = "/var/www/spa/index.html"
```

This configuration serves index.html for all requests, allowing your JavaScript framework (React, Vue, Angular, etc.) to handle routing.

## Directory access Control

By default, Quark does not allow directory listing. When accessing a directory without an `index.html` file, a 403 Forbidden error is returned. This prevents users from browsing the directory structure.

If you want to enable directory browsing (showing a file explorer interface), you must explicitly configure `authorized_dirs`:

```toml
[[services.my_site.file_servers]]
source = "/files/*"
target = "/var/www/files"
authorized_dirs = [
  "/*",                    # Allow all paths by default
  "!/private/*",           # Deny access to /private/ directory
  "!/others/*",             # Deny access to /others/ directory
]
```

With this configuration:

- Users can browse directories and see their contents (file explorer view)
- Access to /private/ and /admin/ directories is blocked
- Individual files can still be accessed directly by their URL

**Important:** If you don't specify authorized_dirs, directories cannot be browsed, but individual files can still be accessed if you know their exact path.
