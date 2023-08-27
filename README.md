# create-my-express

Create a minimal deployable express web api project in TypeScript or JavaScript

## Usage

```sh
# with npx
npx create-my-express --typescript name-of-app
# with yarn
yarn create my-express --typescript name-of-app
# pnpm support in development
```

## Features

- Just the basics almost every project needs

- `import x from "y"` module syntax

- No assumptions about database choices, no html templating

- Yarn support, Windows support

- TypeScript option

- Jest & supertest for testing endpoints

- Dockerfile included

## Options

```
Options:
  -V, --version      output the version number
  -G, --nogit        do not initialize a git repository
  -n, --name <name>  project-name
  -t, --typescript   generate typescript project template
  -y, --yarn         use yarn instead of npm
  -h, --help         display help for command
```

## Generated Project Structure

```
.env
Dockerfile
...
/src
  /controllers
    /root
      getRoot
      postRoot
  /middleware
    errorHandler
    fourOhFour
  /routes
    root
  /tests
    root.spec
  app
  config
  index
```

## Template Sources

[node express starter](https://github.com/redcartel/node-express-starter-2022)
or a
[typescript express starter](https://github.com/redcartel/node-express-typescript-starter-2022)

## Etc.

Help, contributions, and criticisms are very welcome.

Thanks to [CJ R.](https://github.com/w3cj) who originally developed
create-express-api, on which this project is based.
