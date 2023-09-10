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

