# Meetjs 2023 - Nx Remote Caching Demo

This is a demo repository for Nx Remote Caching.

## What is Nx Remote Caching?

Nx Remote Caching is a feature of Nx that allows you to cache the results of
computationally expensive operations in a remote cache. This allows you to
share computation results between developers and CI/CD pipelines.

In this demo repo you'll find a simple Nx workspace with the application "Booking" and
simple libraries that have dependencies between each other.

Also, you'll find a `remote-cache` folder, which contains the implementation of the
remote cache. I created two example task runners:

1. Default - which is the default task runner that comes with Nx
2. AWS - which is a task runner that uses AWS as a remote cache

## Why you need to know about it?

Nx Remote Caching is a feature that is available in Nx. Of course, you can use
Nx Cloud to get the same benefits, but if you don't want to pay extra money for
Nx Cloud, you can create your own that will use your own infrastructure with your
features and optimisations.

## Getting Started

### Build and deploy the remote cache

I made a simple deployment script that will deploy remote-cache in your local `node_modules`
and build it. You can find it in `remote-cache/tools/deploy-remote-cache`.

```bash
npm run deploy:remote-cache
```

PS: Deploy will only work if you use terminal that supports bash scripts. You can try to run it in Git Bash.

To watch changes in `remote-cache`, you can run:

```bash
npm run watch:remote-cache
```

### Build application

To build the application with custom default task runner:

```bash
npm run build:app:default
```

To build the application with custom AWS task runner:

```bash
npm run build:app:aws
```

### Debugging

To log debug messages with the application build, run the following command:

```bash
NX_CACHE_VERBOSE_LOGGING=true npm run build:app:aws
```

### Clean cache

To clean the cache, run the following command:

```bash
npm run nx clear-cache
```

## How it works?

### defaultTaskRunner

Default task runner is a function that is executed by Nx before build an application. You can
find the implementation in `remote-cache/src/lib/task-runners/default/task-runner.ts`.
It uses `@nrwl/devkit` package to run tasks. To execute `defaultTaskRunner` you
need to pass `tasks`, `options` and `context` inside.

To learn more about `defaultTaskRunner`, try to read the source code or types in
`@nrwl/devkit` package.

### remoteCache

If you'll dig into `defaultTaskRunner` implementation, you'll find that it uses
`remoteCache` function to cache the results of the computation. `remoteCache` has
two methods:

1. `retrieve(hash: string, cacheDirectory: string): Promise<boolean>` - which retrieves the result from the cache
2. `store(hash: string, cacheDirectory: string): Promise<boolean>` - which stores the result in the cache

If promise resolves with `true`, it means that the result was retrieved/stored
successfully. If promise resolves with `false`, it means that the result was not
retrieved/stored successfully.

### Store/Retrieve files

You probably have noticed, that arguments of retrieve/store functions have hash and cacheDirectory.
Hash is a unique identifier of the result. Cache directory is a path to the directory
where the result will be stored. 

Every Nx task saves its result in the `node_modules/.cache/nx` directory. So, if you want to
store the result of the task, you need to copy the result from `${cacheDirectory}/${hash}` to
your cache provider. Same for retrieve, you need to download the result from your cache provider
to `${cacheDirectory}/${hash}`.

And that's it. Now you can implement your own `remoteCache` function that will
use your own infrastructure. You don't need to use AWS, you can use any other
cloud provider or even your own server.

## Useful links

- [Bojanbass AWS Implementation](https://github.com/bojanbass/nx-aws)
- [Nx RemoteCache Interface](https://nx.dev/packages/devkit/documents/RemoteCache#interface:-remotecache)
- [Nx DefaultTasksRunnerOptions Interface](https://nx.dev/packages/devkit/documents/DefaultTasksRunnerOptions)
- [Nx defaultTasksRunner Function](https://nx.dev/packages/devkit/documents/defaultTasksRunner)