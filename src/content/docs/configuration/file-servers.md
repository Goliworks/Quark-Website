---
title: File Servers configuration
description: Configuration reference for File Servers
---

The `[[services.<name>.file_servers]]` section defines routes that serve static files directly from the filesystem. Each file server specifies a path pattern to match and a local directory or file to serve.

## Parameters

### `source`

- **Type**: `String`
- **Required**: Yes
- **Description**: The path pattern to match incoming requests against. Use `/*` to match all paths under a given prefix. For example, `/static/*` matches `/static/css/style.css`, `/static/js/app.js`, etc. Use `/*` at the root to match all requests.

### `target`

- **Type**: `String`
- **Required**: Yes
- **Description**: The local filesystem path to serve. Can be either a directory (to serve multiple files) or a specific file (useful for SPAs). When targeting a directory, Quark automatically serves `index.html` if present when accessing the directory itself.

### `authorized_dirs`

- **Type**: `Array<String>`
- **Required**: No
- **Description**: List of directory patterns that control access and directory listing. By default, Quark does not allow directory browsing. When `authorized_dirs` is specified, matching directories become browsable with a file explorer interface. Patterns starting with `!` deny access. Rules are evaluated in order.

### `custom_404`

- **Type**: `String`
- **Required**: No
- **Description**: Path to a custom 404 error page to serve when a requested file is not found. Must be an absolute filesystem path to an HTML file.

### `headers`

- **Type**: `Headers`
- **Required**: No
- **Description**: HTTP response header manipulation rules specific to this file server. Can only modify response headers (not request headers since there's no backend). These headers override service-level and server-level file server headers. See Headers reference for details.
