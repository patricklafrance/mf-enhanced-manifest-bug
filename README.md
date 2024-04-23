# mf-enhanced-manifest-bug

This repo is related to the following issue: https://github.com/module-federation/universe/issues/2362.

The monorepo contains 3 applications:
- An [host application](./packages/host/)
- A remote module named [remote-1](./packages/remote-1/)
- A remote module named [remote-2](./packages/remote-2/)

## To troubleshoot the issue

First install the dependencies with PNPM:

```bash
pnpm install
```

Then, ensure that thhe the app is functionnal be executing the following command at the root of the workspace:

```bash
pnpm dev-with-all-remotes
```

This command should start the host application and both remotes. The page should render:

```
Hello-from-host-app
Hello-from-remote-1
Hello-from-remote-2
```

Now, reproduce the issue by ending the previous process and executing the following command at the root of the workspace:

```bash
pnpm dev-only-host
```

This command should only start the host application, meaning that both remotes are offline. The following error should be thrown after a few seconds:

```
Error
[ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: [ Federation Runtime ]: Failed to get manifestJson for remote2. The manifest URL is http://localhost:8082/mf-manifest.json. Please ensure that the manifestUrl is accessible.

Error message:

TypeError: Failed to fetch
```

Now, stop the process and go to the [packages/host/webpack.dev.js](./packages/host/webpack.dev.js) file and comment the following:

```js
remotes: {
    "remote1": "remote1@http://localhost:8081/mf-manifest.json",
    "remote2": "remote2@http://localhost:8082/mf-manifest.json"
}
```

Then uncomment the following:

```js
remotes: {
    "remote1": "remote1@http://localhost:8081/remoteEntry.js",
    "remote2": "remote2@http://localhost:8082/remoteEntry.js"
}
```

Execute the following command at the root of the workspace:

```bash
pnpm dev-only-host
```

The page should render the following:

```
Hello-from-host-app
```

And you should find the following in the console error logs:

```
offlineRemotePlugin.js:21 remote1/HelloWorld.jsx offline
offlineRemotePlugin.js:21 remote2/sayHello.js offline
```

