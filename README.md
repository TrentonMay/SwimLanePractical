# Welcome to my super neat Practical

###### Tools used
- cypress
- jest
- axios

###### Cypress Tests
Example cypress tests for this practical are in `cypress/integration/SwimlaneTest/uiTestSpec.js`
The example cypress tests showcase the custom commands that we're created for this application
Commands can be found in `cypress/support/commands.js` which acts as the library for these tests
Comments about each command can be found in the `commands.js` file

To run the example Cypress test as-is please navigate to the project directory after pulling down the repo and run `npx cypress open` and proceed to select the test listed
Please note that you will need to provide you're own username/password in the file as well as other desired information (I did not want to place my own credentials publicly on github of course)

Please be sure that you have node installed before attempting

###### Jest Tests
The jest tests for this practical are located in `__tests__/api.spec.js`
Please run `npm run test` to run the jest tests. 
You will need to read the test first to change values such as username and password (I did not want to put usernames and passwords on the open internet)
Comments are in the document about where to place username and password and tokens

