# ai-ed.github.io
# AI Education Resources

Static JSON Database for Resources:

```json
[
    {
        "name":         "ChatGPT",
        "affiliated":	"OpenAI",
        "blurb":        "A chat application using OpenAI's GPT LLM.",
        "description":  "An online chat application utilizing OpenAI's GPT large language model (LLM) to understand user inputs and generate outputs.",
        "released":     "30-10-2022",
        "link":         "https://chat.openai.com/"
    },
]
```

Which is an array of JavaScript Objects containing the following fields:

- name
- affiliated
- blurb
- description
- released (DD-MM-YYYY)
- link

## Local development

### Requirements
* Install [node](https://nodejs.org/en) using [nvm](https://github.com/nvm-sh/nvm)

### Serving site on watch mode

The following command will install [browsersync](https://browsersync.io/docs) and allow you to serve the site locally
and will watch all the files and update the browser when things change

* Run `npm install`

* Run `npm run serve`

### Testing
* Run `npm run test` so the tests are continuously run. When you make any changes to the files which affect the tests and save, it will immediately show up on the test watch.
 

## Issue and pr ettiquete

why are issues used. 
the general structure of an issues
making a branch to work on an issue

#### Issues

Issues are a good way to show what feature is currently being worked and allows others to see what is needed for the feature to be declared as complete.

An issue has a title and a body.

The title should describe the feature being worked on, while the body should describe what's possible as a result of completing the feature and what criteria the feature must comply with (acceptance criteria).

For the acceptance criteria, state exactly what the feature must do for it to be declared as complete. For example, If I were working on filtering items based on the tags they have, my criteria could be the following: When the user picks one or more tags to filter by, then only the items which contain the selected tags should appear.

Note: for working on features it is a good idea to work on it in a separate branch. If a change is made in the new branch and everything suddenly stops working, that effect is isolated from the main branch. 

To make a new branch run `git checkout -b [name of branch]`.

### Prs

To create a Pr, run `gh pr create`. After that you will receive options to edit the title and body of the pr.

The title of the pr should be the feature you are working on, while the body should describe the result of completing the feature and the changes made in the code.

For describing the changes made in the code, it is not necessary to put every little change since that can be seen by comparing the files. It is important to mention the big changes that have occurred, such as added dependencies, tests, and functions which contain a lot of logic.

When describing the changes made, list the file that you modified and describe the changes to the file below.

After you finish editing the title and body, submit the pr.

### Reviewing and merging the pr

Give the reviewer time so they can make comments on your code. If they say everything looks good, then it is time to merge the pr. When merging the pr choose the merge and squash option. This will allow the person who merges the pr to control which commits stay when the branch is merged.

Note: the person who submitted the pr must merge it. 

