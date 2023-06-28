# Exercise tasks

In this exercise, you will create a React starter project using Webpack. You are provided with a basic webpack configuration and an entry file which expects to find a DOM element with the id `app`. Your task is to complete various steps to enhance the project setup and use React with JSX syntax.

## Prerequisites

Before starting the exercise, make sure you have `Node.js` and `npm` (Node Package Manager) installed on your machine.

## Task 1: Running the project
1. Run `npm install` to install the required Webpack and React dependencies declared in `package.json`.

2. Run `npm run build` to build your project. This will run the build script in `package.json`, which runs the command `webpack`. Webpack will output the bundle to the `dist` folder as configured in the webpack config file.
  
3. We're still missing a HTML file to open the project in a browser.. Create a file `index.html` in the dist folder. The file should contain a `script` tag referencing `main.js`. It should also contain a div with the id `app`, which is the root element where React will render the component tree. It's important that the script runs **after** the DOM content has been loaded. This is done by either adding a `defer` attribute to the script tag, or putting it at the end of the `body`.

4. Open the `index.html` file in the browser to ensure everything is working as expected.

## Task 2: Adding a development server
Having to build the project each time you make code changes can be tedious. Webpack has a development server which is commonly used when developing locally. This will watch the files and automatically rebuild the project and reload the browser when file changes are detected.

1. Add `webpack-dev-server` as a dev dependency by running `npm install -D webpack-dev-server`.

2. Configure the dev server by adding the following configuration to the webpack config:
```javascript
 devServer: {
   port: 3000,
   open: true,
    static: {
        directory: path.join(__dirname, 'dist'),
    },
   historyApiFallback: true
  },
```
**Options:**
* `port`: The port number which the development server will run on.
* `open`: Automatically opens the application in the default web browser when the development server starts.
* `static.directory`: Specifies the directory from which the content will be served. 
* `historyApiFallback`: When historyApiFallback is set to true, the development server will serve the index.html file (or the specified fallback HTML file) for any requested route that doesn't match an existing file. This is the case for all single-page applications.

1. Run `npx webpack serve` to ensure it works as expected.
2. Add a start script to `package.json`:

```javascript
  "scripts": {
    "build": "webpack",
    "start": "webpack serve"
  },
```

3. Run the dev server again by running `npm start`.

## Task 3: Adding JSX support
React components uses a syntax called JSX to describe their structure and behaviour. JSX code is not directly understood by web browsers. It needs to be transformed into plain JavaScript before it can be executed. Tools like Babel are commonly used to transpile JSX code into regular JavaScript code that browsers can understand.

1. Replace the `element` variable in `index.js` with its JSX equivalent:
```jsx
const element = <h1>Hello world, current time: {getCurrentDate()}</h1>;
```
2. Babel will transform the JSX to a call to `React.createElement()`, so React need to be in scope for this to work. Add `import React from 'react'` to the top of the file.
3. Rename the file to `index.jsx` so the editor formats the code correctly.
4. Change the entry-point in `webpack.config.js` to include the `.jsx` extension.
5. Re-run `npm start` to pick up the new webpack config.
   
Look at the error message in the browser. Webpack is not able to process this file because it encounters non-javascript syntax. We need to add babel to transpile the code back to how it was before we added JSX. 

6. Install the required Babel packages by running the following command
```shell
npm install -D @babel/core @babel/preset-react babel-loader
```

Update the ```webpack.config.js``` file to include the Babel loader for JavaScript files. The updated rule should look as follows:
```javascript
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    },
  ],
}
```

This will ensure that when webpack encounters js and jsx files, they will be preprocessed by babel-loader, which will transform JSX syntax to plain Javascript because we've added the preset `@babel/preset-react` for this.'

6. Re-run `npm start` to ensure that the application works again.


##Handle Images
1. Import the provided image by adding `import clockImage from "./assets/clock.jpg" ` to the top of the file.
2. Add the `clock.jpg` image to the component by changing the `element` to 
```jsx
const element = (
  <div>
    <h1>Hello world, current time: {getCurrentDate()}</h1>
    <img style={{width: '300px'}} src={clockImage} />
  </div>
);
```
Check the error you get in the browser.

3. Add a loader to handle image files under `module.rules` in `webpack.config.js`. Previously, it was common to use `file-loader` for this, but it is now built in to webpack with `Asset Modules`
```javascript
{
  test: /\.(svg|png|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
}
```

This will emit the image to the `.dist` folder with a randomly generated name, and inject the path of this file into the `clockImage` variable of the bundle. Note that you won't see this in the dist folder when using the dev server, as it works in memory.

4. Re-run `npm start` to pick up the new config. 

5. Ensure that the image is displayed now.


## Task 4: Debugging - Adding source maps
Code debugging is a good thing to learn early to avoid putting `console.log` all over your code to print out variables and find a bug. Let's try to debug the code and see what we get. 

1. In `index.js`, add a debugger statement after the `createRoot` call.
```jsx
const root = createRoot(document.getElementById("app"));

debugger;

const element = ...
```

2. In your browser, open your dev tools and refresh the page to hit the debugger statement. Does the code look like the code you wrote? Probably not, because we're looking at the output code from webpack.

We can configure webpack to include mapping to our original code by adding the `devtool` option.

3. In `webpack.config.js`, add the line `devtool: "source-map"` on the root level of the config. 

4. Re-run `npm start` to pick up the new config and try debugging in the browser again. 


5. Remove the debugger statement before continuing to the next task.


## Task 5: Linting
Common code mistakes which can cause runtime errors can be prevented by running some form of static code analysis. Such tools are called linters. Many linters integrate with code editors and IDE's, but it's also common to have these in the CI/CD pipeline to enforce rules and prevent bad code from ever reaching production.

ESLint is a commonly used linter which has a ton of community support and pre-defined rules for different libraries and frameworks.

Let's add some bad code and see if we can catch it with a linter.

1. Run the following command to install ESLint and its dependencies as dev dependencies: 

```shell
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks
```

This installs ESLint, along with the necessary plugins for React and React Hooks.

2. Create ESLint Configuration: ESLint requires a configuration file to define its rules and settings. Create a `.eslintrc.json` file in the root directory of your project.

```json
{
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": ["react", "react-hooks"],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    // Add any additional rules or overrides
  }
}'
```

* The `extends` option implements predefined rules. 
* The `plugins` options specifies which plugins are included here we're referencing `eslint-plugin-react` and  `eslint-plugin-react-hooks`. Just declaring them as plugins would have no effect without either adding them in the `extends` array above or manually specifying rules in the `rules` section.
* The `rules` option can be used for things like adding or disabling rules and changing severity.

3. We do not want eslint to lint any webpack output in our `dist` folder, or our `webpack.config` file. Create a new file `.eslintignore` and add the following lines to ignore these.

```
dist 
webpack.config.js
```


4. Add a new script to `package.json`

```json
"lint": "eslint **/*.{js,jsx}"
```

5. Run the script with `npm run lint` and see if you get any errors.

6. Fix any errors. One of them should be related to a missing configuration option in eslint, making eslint unsure of which environment it's running in.


7. **Editor Integration (optional)**: To get real-time linting feedback within your code editor, install the ESLint extension or plugin for your editor. Popular editors like VS Code provide ESLint extensions that highlight issues and provide suggestions as you write code.


## Task 6: Seperating webpack configs
It's common to see apps with multiple webpack configs. For example, we do not necessarily want to include source maps in production, and we may want our code both minified and uglyfied so our code can't easily be duplicated or tampered with. Let's change our config to support this.

1. Rename `webpack.config.js` to `webpack.dev.config.js`
   
2. Make a new prod config named `webpack.prod.config.js` and copy over the contents from the previous config.

3. Change mode to `production` and remove the `devTool` and `devServer` options.

4. Change the scripts in `package.json` to use different configs for the `build` and `start` script.

```json
    "build": "webpack --config webpack.prod.config.js",
    "start": "webpack serve --config webpack.dev.config.js"
```

5. Ensure that the new configs work by re-running `npm start` and `npm run build`.
    
6. In `.eslintignore`, change the webpack line to `webpack.*.config.js` to ignore linting of both files.

## Task 7: HtmlWebPackPlugin

A commonly used plugin with webpack is HtmlWebpackPlugin. It is used to generate an HTML template file that is output to the `dist` directory during the build process. Webpack automatically injects the entry point of your JavaScript code into the HTML file with the correct path. This plugin is especially useful in production environments where it is common to include a unique hash in the output file's name to prevent caching issues.

1. Install the HTMLWebpackPlugin package by running the following command:
```shell
npm install -D html-webpack-plugin
```
2. Create a html template file `src/index.html` with the following content:

```html
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React App</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>

```

Note that no script tag is included here. The plugin takes care of that for us.


3. Update both webpack config files to include the HTMLWebpackPlugin. Add the following line to the top of the file:
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

4. Add the following plugin to the root of the exported object.
```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```

5. Delete the `dist` folder and run `npm run build`. Ensure that an index.html file is output and ensure that our production configuration works by opening `index.html` in the browser.

6. Delete the `dist` folder and run `npm start`. Webpack dev server will not output a dist directory this time (it's in memory), but the config is correct if the app runs.

**Note**: When working with webpack, it is common to encounter repetitive configuration code and the potential for inconsistencies between development and production environments. To address this, a recommended approach is to utilize three separate configuration files.

The first file is the common configuration, which contains settings shared between development and production. This ensures consistency and minimizes duplication. The dev-specific and prod-specific configurations reside in their respective files, containing settings specific to each environment.

To merge these configuration files based on the target environment, we can leverage a utility called webpack-merge. This utility allows us to combine the common configuration with the environment-specific configurations, resulting in a unified configuration for each target.

By adopting this approach, we can reduce repetition, prevent human errors, and maintain consistent behavior across different environments. For more detailed information, you can refer to the official webpack documentation's guide on production builds: [Webpack Production Guide](https://webpack.js.org/guides/production/).

## Further reading

### Browser compatibility
Read more about [Babel preset env](https://babeljs.io/docs/babel-preset-env). A popular preset used with Babel. The preset considers the browser versions or Node.js versions you want to support and automatically applies the appropriate transformations for those environments. This helps you write code using modern syntax while maintaining compatibility with older browsers or Node.js versions.

### Proxies
When developing locally with API requests to backend services, it's common to use the proxy functionality of webpack.

In production, the frontend and backend services are typically served from the same domain. e.g `itera.com`. When making requests to the backend service, we make a request to the domain with `/api/someEndpoint` (`itera.com/api/someEndpoint`). 

However, when we're developing locally. Our frontend is running locally on e.g. `localhost:3000`, while we want to make requests to our backend running on another domain, e.g. a test environment on `test.itera.com`. When we make a request like this, we will usually encounter a CORS error. This is caused by a security measure called **Same-Origin Policy**: Browsers enforce this policy, which restricts web pages from making requests to a different domain or port than the one serving the page itself.

There's two common solutions to this: 

1. Configure the backend service to allow requests from the development domain, e.g. `localhost:3000` by adding this domain to the `Access-Control-Allow-Origin`-header in the response.

2. Use webpack proxy as an intermediary between your frontend code and an API server during local development. The proxy will modify the headers, so the requests back and forth act as if they were sent and received from the same domain.