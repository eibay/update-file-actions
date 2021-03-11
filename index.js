const core = require('@actions/core');
const github = require('@actions/github');
const yaml = require('js-yaml');
const fs = require('fs');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  const filePath = core.getInput('file-path');
  const fileName = core.getInput('file-name');
  const fullPath = "./" + filePath + "/" + fileName;
  core.setOutput("full-path", fullPath);
  console.log('The full path:', fullPath);
  console.log('GH:', $GITHUB_WORKSPACE);

  let doc = yaml.safeLoad(fs.readFileSync(fullPath, 'utf8'));
  fs.writeFile(fullPath, yaml.safeDump(doc), (err) => {
      if (err) {
          console.log(err);
      }
      console.log('file reading success...')
  });

} catch (error) {
  core.setFailed(error.message);
}