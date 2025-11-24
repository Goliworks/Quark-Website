---
title: Redirections
description: Learn how to configure a reverse proxy in Quark
---

Quark supports HTTP redirections to automatically redirect clients from one URL to another. This is useful for migrating domains, enforcing URL patterns, or redirecting old URLs to new locations.

## Exact path redirection

When a user visits `https://example.com/old-page/`, they will be redirected to `https://example.com/new-page/`.
By default, redirections use a 301 (Permanent) status code.

```toml
[[services.my_site.redirections]]
source = "/old-path/"
target = "https://example.com/new-path/"
```

This configuration:

- Matches: `/old-path/` exactly
- Does not match: `/old-path/page`, `/old-path/anything`
- The target URL replaces the source completely

## Wildcard redirection

Wildcard redirections preserve the path suffix from the original URL:

```toml
[[services.my_site.redirections]]
source = "/blog/*"
target = "https://newsite.com/articles/"
```

This configuration:

- `/blog/` → `https://newsite.com/articles/`
- `/blog/post-1` → `https://newsite.com/articles/post-1`
- `/blog/category/tech` → `https://newsite.com/articles/category/tech`

The asterisk (\*) at the end of the source path indicates that the remaining part of the URL should be preserved and appended to the target.

## Redirection status codes

You can specify different HTTP status codes for redirections:

```toml
[[services.my_site.redirections]]
source = "/temporary/*"
target = "https://example.com/new/"
code = 302
```

Supported status codes:

| Code | Description                                         | Use Case                                                        |
| ---- | --------------------------------------------------- | --------------------------------------------------------------- |
| 301  | Permanent redirection (default, cached by browsers) | Use for permanent URL changes (SEO-friendly, browsers cache it) |
| 302  | Temporary redirection (not cached)                  | Use for temporary redirections (maintenance, A/B testing)       |
| 307  | Temporary redirection (preserves HTTP method)       | Like 302, but guarantees POST requests stay POST                |
| 308  | Permanent redirection (preserves HTTP method)       | Like 301, but guarantees POST requests stay POST                |

## www subdomain redirection

Quark automatically handles `www` subdomain redirections based on how you define your domain in the service configuration.

If you want `www.example.com` to redirect to `example.com`, simply define your domain without the `www` prefix:

```toml
[services.my_site]
domain = "example.com"
```

If you want `example.com` to redirect to `www.example.com`, define your domain with the `www` prefix:

```toml
[services.my_site]
domain = "www.example.com"
```

The redirection is automatic and permanent (301), preserving the full path and query string.
