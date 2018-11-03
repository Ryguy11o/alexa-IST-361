# Happy Valley Helper - A State College Alexa Skill
------


Happy Valley Helper is a Skill developed for Amazon Alexa capable devices that gives information about the State College area along with Penn State University.  Intended for use by the general population, this Skill can answer questions about CATA bus locations, academic schedules, and events at venues around Penn State University.  


## Getting Started
------


This repository is used solely by the Alexa Development Team Members for IST361 at Penn State University.  For work on the project, we use GitBash and various development platforms.  


### Prerequisites


While the application itself runs on the Alexa Development Console, local testing is run on systems owned by team members.  

Currently, users must have both NodeJS and npm installed on their device.  Both of these are required for developing and testing this skill locally.  Both can be downloaded [here](https://nodejs.org/en/)

### Installation


Upon downloading NodeJS, we use GitBash to navigate to the project folder in our local files.  Once in the correct directory, we run the following commands to configure NodeJS and npm:

```
npm install
npm install --only=dev
```

Upon doing this, a user can run our skill on their local system, but only with manual JSON input and output.  However, since this is what Alexa uses, we can use it to make sure the code runs correctly and accurately.  


### Testing


Tests to the skills are submitted with a JSON file.  Currently, it is common practice for each intent to have a specified, saved test within the file.  The package.json file holds all the test scripts, and more are added to the list as more intents are created.  These JSON files are found under the Utilities folder, and then in the Events folder.  Test JSON files are pulled as examples from the Alexa Developer Console testing page, and return correct values when the code is up and running correctly.  This way, we can check our current code without having to upload every single version to the Console for tests.


### Deployment


Currently, this skill is not public or published.  All development is done by the Alexa Team for the Happy Valley Helper project at Penn State's IST361 Fall Course.  


Once published, this skill will be deployable on Amazon Alexa capable devices by following the normal installation procedures for custom skills.


## Authors
------


Ryan O'Neill
Nikolas Lecce
Bryce Williams
Konnor Sidler
