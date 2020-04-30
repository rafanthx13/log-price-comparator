## ENV

> https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

Environment Variables FTW!
This is just a glimpse at how you can use environment variables and some of the fantastic tools that you can use with them. In summary, I recommend that you use environment variables and follow these steps:
create a .env file
ignore it in your .gitignore file
use VS Code to edit your .envfile
install the dotenv extension for VS Code
install the npm extension for VS Code
read the .envfile with the dotenv npm package as a dev dependency
use the preloading option of dotenv to remove any runtime references to it
use npm scripts to run your node app
create a template file for your variables called .env.example

https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/