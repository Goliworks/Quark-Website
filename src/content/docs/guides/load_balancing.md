---
title: Load balancing
description: Learn how to configure load balancing in Quark
---

Load balancing distributes incoming traffic across multiple backend servers, improving availability and scalability. Quark supports several load balancing algorithms and can be configured to balance traffic for any service.

## Basic Configuration

To set up load balancing, you need to:

1. Define a load balancer with a list of backend servers
2. Reference that load balancer in a location's target

```toml
[loadbalancers.my_backends]
backends = ["192.168.1.10", "192.168.1.20", "192.168.1.30"]

[services.my_app]
domain = "example.com"

[[services.my_app.locations]]
source = "/*"
target = "http://${my_backends}:8080"
```

In this example, requests to example.com will be distributed across the three backend servers on port 8080.

## Load Balancing Algorithms

Quark supports different algorithms for distributing traffic:

### Round Robin (default)

Distributes requests evenly across all backends in sequential order:

```toml
[loadbalancers.my_backends]
algo = "round_robin" # Optional since it's the default
backends = ["192.168.1.10", "192.168.1.20", "192.168.1.30"]
```

Each backend receives an equal share of requests in rotation.

### Weighted Round Robin

Allows you to assign different weights to backends, sending more traffic to servers with higher capacity:

```toml
[loadbalancers.my_backends]
algo = "round_robin"
backends = ["192.168.1.10", "192.168.1.20", "192.168.1.30"]
weights = [5, 3, 2]
```

In this configuration:

- `192.168.1.10` receives **50%** of requests (5/10)
- `192.168.1.20` receives **30%** of requests (3/10)
- `192.168.1.30` receives **20%** of requests (2/10)

### IP Hash

Routes requests from the same client IP to the same backend server, providing session persistence:

```toml
[loadbalancers.my_backends]
algo = "ip_hash"
backends = ["192.168.1.10", "192.168.1.20", "192.168.1.30"]
```
