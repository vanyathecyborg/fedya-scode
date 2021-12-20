# Beeline OFD App

## Setup

Run dependencies installation

```
yarn
```

Copy `src/environments/environment.jsx.sample` to `src/environments/environment.jsx` and modify as needed.

Copy `src/environments/environment.prod.jsx.sample` to `src/environments/environment.prod.jsx` and modify as needed.

Required hosts all point to the same spot locally.

Develop server: http://10.50.74.227

Prodlike server: http://prodlike.ofd.vimpelcom.ru

## Development

Use [git-flow](https://danielkummer.github.io/git-flow-cheatsheet) for branches management.

Feature branches should be called `feature/OFD-XXX`.

Use `OFD-XXX - Commit message` format for commit messages.

## Development server

Run `yarn start` for a dev server.
Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Dev build

Run `yarn build` to build the project.

* The build artifacts will be stored in the `dist/` directory.
* Source maps will be generated.
* Code is not uglified.
* `environments/environment.jsx` will be used for env variables.

## Prod build

Run `yarn buildProd` to build the project.

* The build artifacts will be stored in the `dist/` directory.
* Source maps, console.log are omitted.
* Code is minified and uglified.
* `environments/environment.prod.jsx` will be used for env variables.

## Fake electronic sign for CryptoPro

Use `useCryptoProDevCerts` environment variable.

## Local ui-toolkit development

If you need to modify ui-tookit, use yarn link

```
git clone https://bitbucket.org/vanyatheangel/ofd-ui-toolkit/src
cd /desired/path/ofd-ui-toolkit
yarn i
yarn link
cd /path/to/ofd/repo
yarn link ofd-ui-toolkit
```

Last toolkit commit 1740530b93673c9afb6842f350fa2fa5dee9197e 
