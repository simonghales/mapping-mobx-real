# ts-mobx-react-starter-kit

This is a starter kit for projects written in [Typescript](https://www.typescriptlang.org/), using [Mobx](https://github.com/mobxjs/mobx) and [React](https://facebook.github.io/react/). :+1:

# Getting started

```
git clone https://github.com/Torwori/ts-mobx-react-starter-kit.git
npm install
```

And you're all set!

Run the dev server:
```
npm start
```

Your app is at `http://localhost:8080/`

Run the tests once or in watch mode:
```
npm run test-once
npm test
```

Lint your project:
```
npm run lint-ts
npm run lint-sass
# or both at the same time
npm run lint
```

Production build (in the `dist` folder):
```
npm run build
```

# The kit contains:

- hot reloading (when possible) with [webpack](https://webpack.github.io/) and [react-hot-loader](https://github.com/gaearon/react-hot-loader)
- styles written in [sass](http://sass-lang.com/) with [cssnext](http://cssnext.io/) and [css modules](https://github.com/css-modules/css-modules)
- automatic html generation with [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) (`./src/index.ejs`)
- linting with [tslint](https://palantir.github.io/tslint/) and [sass-lint](https://github.com/sasstools/sass-lint)
- tests with [karma](https://karma-runner.github.io/0.13/index.html) and [jasmine](https://jasmine.github.io/2.4/introduction.html)
- coverage report (`./coverage`)
- [mobx-react-devtools](https://github.com/mobxjs/mobx-react-devtools) (automatically excluded from production builds)

# Configuration

This starter kit is quite opinionated, so you will most likely want to change some settings to suite your needs. The following files will most likely interest you:

- `.editorconfig` ([rules](http://editorconfig.org/))
- `.sass-lint.yml` ([rules](https://github.com/sasstools/sass-lint/tree/develop/docs/rules))
- `karma.conf.js` ([rules](https://karma-runner.github.io/0.13/config/configuration-file.html))
- `package.json`
- `tsconfig.json` ([rules](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html))
- `tslint.json` ([rules](https://palantir.github.io/tslint/rules/))
- `webpack.config.json` ([rules](https://webpack.github.io/docs/configuration.html))

When installing new libraries with `npm`, you might need to let the typescript compiler know about them. To do so, use the `typings` tool. See [here](https://github.com/typings/typings#quick-start) for more info.

# Contributing

All contributions are welcome!

That said, please don't submit *stylistic* pull requests and issues (eg. use tabs instead of spaces).

# License

MIT
