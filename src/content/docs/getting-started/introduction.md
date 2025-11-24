---
title: What is Quark?
description: Learn how to configure a reverse proxy in Quark
---

Quark is a fast reverse proxy and file server for Linux written in Rust. It combines the functionality of a reverse proxy with load balancing capabilities and static file serving in a single, efficient binary.

It serves as a modern alternative to traditional web server setups, offering:

- Reverse Proxy: Forward incoming requests to backend applications and services
- Load Balancing: Distribute traffic across multiple backend servers for improved availability and performance
- Static File Server: Serve files, static websites, and Single Page Applications directly

All of this is configured through simple TOML configuration files, making it easy to set up and maintain.

## Key features

Quark provides a comprehensive set of features for modern web infrastructure, balancing simplicity with powerful capabilities.

### Easy Configuration

Quark uses straightforward TOML configuration files where you define your services, routes, and backends in a clear, readable format. No complex syntax or obscure directives. Just simple key-value pairs organized in logical sections. Configuration files can be split and imported, allowing you to organize large setups into manageable pieces.

### Automatic HTTPS

Enable HTTPS by simply specifying your certificate and key paths in the configuration file. Quark handles TLS termination and automatically redirects HTTP traffic to HTTPS by default. Support for SNI (Server Name Indication) allows you to host multiple domains with different certificates on the same server, while wildcard and multi-domain (SAN) certificates let you share certificates across services.

### Native IPv6 Support

Full support for both IPv4 and IPv6 through dual-stack sockets ensures compatibility with modern network infrastructures. Quark listens on both protocol versions simultaneously, requiring no additional configuration or separate services.

### HTTP/2 by Default

All HTTPS connections automatically use HTTP/2, providing improved performance through request multiplexing, header compression, and efficient resource loading. This happens transparently without any configuration needed.

### Load Balancing

Distribute traffic across multiple backend servers to improve availability and handle higher loads. Quark supports multiple algorithms to fit different needs:

- Round Robin for even distribution across all backends
- Weighted Round Robin to send more traffic to servers with higher capacity
- IP Hash to maintain session persistence by routing the same client to the same backend

Load balancers can be defined separately and reused across multiple services, making configuration clean and maintainable.

### Static Content Serving

Serve static files, complete websites, or Single Page Applications without needing a separate web server. Includes support for custom 404 pages and directory browsing control.

## Getting Started

Ready to use Quark? Head to the [Installation guide](/getting-started/installation) to get started, or check out the [Quick start guide](/getting-started/quick-start) for a rapid setup.
