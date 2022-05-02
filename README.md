# create-my-express

Generate a minimal, production-ready express template project

Creates a new project from either either a [node express starter](https://github.com/redcartel/node-express-starter-2022) or a [typescript express starter](https://github.com/redcartel/node-express-typescript-starter-2022)
## Installation

Install the CLI globally OR use npx:

```sh
npm install -g create-my-express
```

## Usage

```sh
# with global install
create-my-express name-of-app
# with npx
npx create-my-express name-of-app
# with yarn
yarn create my-express name-of-app
```

## Options

```
Options:
  -V, --version      output the version number
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

## Dependencies

```
cors
dotenv
express
helmet
morgan
```

Help, contributions, and criticisms are very welcome.

Thanks to [CJ R.](https://github.com/w3cj) who originally developed create-express-api, on which this project is based.