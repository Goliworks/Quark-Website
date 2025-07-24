---
title: Quick start
description: How to start with Quark
---

After you have installed Quark, the server is already running on port `:80`.

If you go to your localhost, or your sever IP address, you will see the Quark welcome page.

## Simple configuration

Quark uses `.toml` files for its configuration.

If you are not familiar with the TOML format, you can read more about it [here](https://www.toml.io/en/v1.0.0).

Once Quark is installed, you can access the main configuration file with the following command.

```bash
vim /etc/quark/config.toml
# You can, of course, use your favorite editor.
```

If it's the first time you install Quark, the default configuration file should be blank.
That's why the welcome page is displayed when you try to access your server.

Here's an example of a very simple service.

```toml
[services.your_service_name]
domain = "yourservice.com"

[[services.your_service_name.locations]]
source = "/*"
target = "http://192.168.0.10:8888"
# Replace the IP address with your backend server's IP address.
```

Save the file and restart Quark with the following command.

```bash
systemctl restart quark
```

And now, you have a working Quark server! 🚀
