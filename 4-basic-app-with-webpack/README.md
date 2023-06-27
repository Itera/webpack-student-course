# Contents

An example of a webpage with html and javascript with es6 modules and webpack. To run this: 

1. Run `npm install` to install the dev dependencies declared in `package.json`.
2. Create a `dist` folder.
3. Create a `index.html` file withing the `dist` folder. The file should have a `div` container with id `mainContainer` and should import a script `main.js` from the same folder as it's located.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./main.js" defer></script>
  </head>
  <body>
    <div id="mainContainer"></div>
  </body>
</html>

``` 

4. Open the `index.html` page in the browser to ensure the app works.

5. Look at the output javascript code in `dist/main.js`. This is using the default webpack config. Which outputs the code as production code.


6. Create a very basic `webpack.dev.config.js` file with the following contents:

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

```
7. Add a build script to `package.json`:
```js
 "scripts": {
    "build": "webpack"
  }
```

8. Run `npm run build` and look at the output javascript again. This time, it's different because we've changed the `mode` option from the default.