# Chaicode-Web-Dev-Cohort-Projects

Web Development Cohort 1.0 - Project Implementation

1.  Generate npm without having it ask any questions:
    npm init -y

2.  install packages which we need
    npm i express mongoose dotenv cors express-validator

3.  as we will be working on a ptoject with multiple developers, we need to set ground roules for coding syntacs we need to maintail json file {.prettierrc} in root
    npm install --save-dev prettier

    include standard in json.
    {

    "tabWidth": 2,
    "useTabs": false,
    "semi": true,
    "singleQuote": false,
    "trailingComma": "all",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "arrowParens": "always"
    }

4.  Create .prettierignore and include node_modules and .env

5.  update pacjage.json and include type module
    "type": "module",

6.  create .env , .env.local , and env.example

7.  Create Project folders structure in src folder
    mkdir controllers db middlewares models routes utils validators

8.  Create app.js and index,js in src folder

9.  create DB connect filr in db folder with name db.js

10. then create api-error.js , api-response.js , constants.js and async-handler.js in utils folder

11. now start wring MVC code of your project.
