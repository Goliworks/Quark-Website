---
title: Redirections configuration
description: Configuration reference for Redirections
---

The `[[services.<name>.redirections]]` section defines URL redirections that automatically redirect clients from one URL to another. Each redirection specifies a source pattern and a target URL.

## Parameters

### `source`

- **Type**: `String`
- **Required**: Yes
- **Description**: The path pattern to match for redirection. Can be an exact path (e.g., `/old-page/`) or a wildcard pattern (e.g., `/blog/*`). When using a wildcard with `*`, the remaining path after the pattern is preserved and appended to the target URL.

### `target`

- **Type**: `String`
- **Required**: Yes
- **Description**: The destination URL to redirect to. Must be a complete URL including protocol and domain (e.g., `https://example.com/new-page/`). When the source uses a wildcard pattern, the matched suffix is automatically appended to this target.

### `code`

- **Type**: `String`
- **Required**: No
- **Default**: `301`
- **Description**: HTTP status code for the redirection. Supported values are `301` (permanent), `302` (temporary), `307` (temporary, preserves method), and `308` (permanent, preserves method).
