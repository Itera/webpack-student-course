# Exercise tasks

In this exercise, you will create a React starter project using Webpack. You are provided with a basic Webpack configuration and an entry file which expects to find a DOM element with the id `app`. Your task is to complete various steps to enhance the project setup and use React with JSX syntax.

## Prerequisites

Before starting the exercise, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

## Running the project
1. Run `npm install` to install the required Webpack and React dependencies declared in `package.json`.

2. Run `npx webpack` to build your project. Webpack will output the bundle to the `dist` folder as configured in the webpack config file.
  
3. Create a file `index.html` in the dist folder. The html file should contain a `script` tag referencing `main.js`. It should also contain a div with an id `app`, which is the root element where React will render the component tree.

4. Open the `index.html` file in the browser to see if everything is working as expected.

## Adding devserver
Having to run webpack each time you make code changes can be tedious. Webpack has a dev server which is commonly used in development. Add this by adding the following line to the webpack config.

```javascript
 devServer: {
    port: 3000,
    open: true
  },
```

## Adding HTMLWebpackPlugin
  



5. Create a new directory for your project and navigate into it using the command line.

Install the required dependencies by running the following command:shell
```shell
npm install react react-dom
```

Create the following project structure:
```lua
|- src
   |- index.js
|- dist
|- webpack.config.js
|- package.json
```

Copy the provided Webpack configuration into the ```webpack.config.js``` file.

Copy the provided entry file content into the ```index.js``` file.Exercise TasksTask 1: Add Babel for JSX

Install the required Babel packages by running the following command:shell
```shell
npm install @babel/core @babel/preset-react babel-loader --save-dev
```

Update the ```webpack.config.js``` file to include the Babel loader for JavaScript files. The updated rule should look as follows:javascript
```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-react']
    }
  }
}
```

Run the Webpack build command to bundle the code:shell
```shell
npx webpack
```

Ensure that the build is successful and check if the JSX code is transformed correctly.Task 2: Handle Images

Copy an image file (e.g., ```image.jpg```) into the ```src``` directory.

Update the ```webpack.config.js``` file to include a loader for image files. Add the following rule:javascript
```javascript
{
  test: /\.(png|jpe?g|gif)$/i,
  type: 'asset/resource'
}
```

Import the image in the ```index.js``` file:javascript
```javascript
import image from './image.jpg';
```

Use the imported image in the JSX code (e.g., ```&lt;img src={image} alt="My Image" /&gt;```).

Run the Webpack build command and observe any error messages related to the image loading.Task 3: Add Source Maps

Update the ```webpack.config.js``` file to enable source maps. Add the following line to the configuration:javascript
```javascript
devtool: 'eval-source-map',
```

Run the Webpack build command and inspect the generated source maps.Task 4: Use Webpack Dev Server

Install the Webpack Dev Server package by running the following command:shell
```shell
npm install webpack-dev-server --save-dev
```

Update the ```package.json``` file to add a new script command:json
```json
"scripts": {
  "start": "webpack serve --open"
}
```

Run the following command to start the development server:shell
```shell
npm start
```

Open your browser and navigate to the provided URL to see your React application running.Task 5: Add HTMLWebpackPlugin

Install the HTMLWebpackPlugin package by running the following command:shell
```shell
npm install html-webpack-plugin --save-dev
```

Update the ```webpack.config.js``` file to include the HTMLWebpackPlugin. Add the following configuration:javascript
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

Create an ```index.html``` file in the ```src``` directory with the following content:html
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

Run the Webpack build command and check if the ```dist``` directory contains an HTML file reflecting the provided template.

Congratulations! You have completed the React starter project setup with Webpack.

Feel free to adjust the exercise instructions based on your specific requirements or add any additional information to support your students during the exercise.