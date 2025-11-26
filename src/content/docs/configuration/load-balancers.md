---
title: Load balancers configuration
description: Configuration reference for Load balancers
---

The `[loadbalancers.<name>]` section defines load balancers that distribute incoming traffic across multiple backend servers. Load balancers can be referenced in location targets using the syntax `http://${loadbalancer_name}:port`.

## Parameters

### `algo`

- **Type**: `String`
- **Required**: No
- **Default**: `round_robin`
- **Description**: The load balancing algorithm to use. Supported values are `round_robin` for even distribution across all backends, and `ip_hash` for session persistence by routing the same client IP to the same backend.

### `backends`

- **Type**: `Array<String>`
- **Required**: Yes
- **Description**: List of backend server IP addresses or hostnames.

### `weights`

- **Type**: `Array<Integer>`
- **Required**: No
- **Description**: List of weights for weighted round robin load balancing. Only applicable when `algo` is `round_robin`. The number of weights must match the number of backends. Higher weights receive proportionally more traffic.
