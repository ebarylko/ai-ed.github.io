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

* Run `npm run start`

### Testing
* Run `npm run test` so the tests are continuously run. When you make any changes to the files which affect the tests and save, it will immediately show up on the test watch.
 
