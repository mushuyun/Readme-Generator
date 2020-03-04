const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

async function generate(){
	try{
		console.log(`taking user input`);
		const userInput = await inquirer
		.prompt([
			{
				type: "input",
				message: "What is your GitHub user name?",
				name: "username"
			},
			{
				type: "input",
				message: "What is your Project Tittle?",
				name: "projectTittle"
			},
			{
				type: "input",
				message: "Please describe your project",
				name: "projectDescription"
			},
			{
				type: "input",
				message: "Provide table of contents",
				name: "tableOfContents"
			},
			{
				type: "input",
				message: "What are the modules required to install for your project?",
				name: "installationSteps"
			},
			{
				type: "input",
				message: "Provide instructions for use.",
				name: "instruction"
			},
			{
				type: "input",
				message: "provide License name ",
				name: "licenseName"
			}, 
			{
				type: "input",
				message: "Provide information on how to run tests.",
				name: "tests"
			},
			{
				type: "input",
				message: "Do you have any questions?",
				name: "questions"
			}
			]);
			console.log(`generating...`);
			console.log(userInput);
			const gitUsername = userInput.username;
			const projectTittle = userInput.projectTittle;
			const projectDescription = userInput.projectDescription;
			const installationSteps = userInput.installationSteps;
			const instruction = userInput.instruction;
			const tableOfContents = userInput.tableOfContents;
			const licenseName = userInput.licenseName;
			const tests = userInput.tests;
			const questions = userInput.questions;
				// fetching data from git user
			const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
			const gitData = gitResponse.data;
			const gitName = gitData.login;
			const gitEmail = gitData.email;
			const gitlocation = gitData.location;
			const gitUrl = gitData.html_url;
			const gitProfileImage = gitData.avatar_url;

				var contents = (`
		# Project Title
		${projectTittle} 

		## Project Description
		${projectDescription}

		## Tableofcontents
		${tableOfContents}
		\n* [ProjectTitle](#ProjectTitle)
		\n* [Author](#Author)
		\n* [Installation](#ModulesInstalled)
		\n* [Instructions](#Instructions)
		\n* [License](#License)
		\n* [Tests](#Tests)
		\n* [Questions](#Questions)
		
		## Installation
		${installationSteps}
		\n![dependencyUptodate](./assets/deUpdate.png)

		## Instructions
		${instruction}

		## License 
		This project is licensed under the ${licenseName} 

		## Tests
		${tests}

		## Questions
		${questions}

		## Contributor 
		\n![ProfileImage](${gitProfileImage})
		\n**${gitName}**
		\nEmail: ${gitEmail}
		\nLocation:${gitlocation}
		\nGitHub: ${gitUrl}
		`)

		var contributor = (`
		## Contributor 
		\n![ProfileImage](${gitProfileImage})
		\n**${gitName}**
		\nEmail: ${gitEmail}
		\nLocation:${gitlocation}
		\nGitHub: ${gitUrl}
		`)	

		await writeFileAsync('readMe.md', contents);
		await writeFileAsync('sue.md', contributor);

		console.log("file generated....");
	} 	catch (err){
		console.log(err);
		}	
}	
	generate();
