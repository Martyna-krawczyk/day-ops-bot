# DayOps Bot

This is a simple slackBot App used to facilitate the rotation of a DayOps Roster.

> The slackbot returns the name of the next person on call and sends a request to the Slack API to push notification '@usergroup.name, you are on DayOps support this week.' to a SIT environment (#proj-slackbot). A Cloudwatch event (cron) can trigger the Lambda at 8am every Monday AEST.

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- /src - Code for the application's Lambda function.
- template.yaml - A cloudformation template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda, Cloudwatch, S3 Buckets and SSM Parameter Store. These resources are defined in the template.yaml file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## AWS Resources

### SIT - greedy-chickens-development-admin

The application requires the slack channelId and usergroupId, as well as the slack API tokens to run - all of which are stored as json in the SSM Parameter Store (/day-ops-bot/slack-bot-config).
The ID of the current user on call is stored in a .txt file in an S3 Bucket (day-ops-bot),
The Lambda Function (day-ops-bot) is created as defined in the template.yaml.

## Installation

### System Requirements

- A command line interface (CLI) such as Command Prompt for Windows or Terminal for macOS
- IDE of your choice

**1.** Clone

- Clone this repo to your local machine and in the CLI, navigate into the folder containing the solution
- Install the project dependencies using `npm install`.

**2.** Create a new [`Slack App`](https://api.slack.com/apps):

**3.**
Add a bot user and select the following scopes:

```bash
app_mentions:read
channels:read
chat:write
usergroups:read
```

**4.** Install the `Slack App` to your workspace.

### Running the application locally

> Note: Populate the token parameters with the values provided by your slack app to run this code ([`see slack app docs`](https://api.slack.com/apps)). This application stores the tokens in AWS SSM Parameter Store.

- Navigate to the solution folder, cd into the root directory of the project and run the project using the below script:

```
$ ops/local-sam-invoke.sh
```

### Running the deployed application

Build the project using the below command:

```
$ sam build
```

Deploy the project using the below command, following the prompts:

```
$ sam deploy --guided
```

---

## Dependencies

[Slack Bolt](https://github.com/slackapi/bolt-js) - A framework to build Slack apps using JavaScript <br/>
[Slack API](https://api.slack.com/) - Slack API <br/>
