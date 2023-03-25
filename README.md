# EmailGPT
![EmailGPT Banner](https://user-images.githubusercontent.com/57494734/227689833-c22abe79-6c0a-407d-9478-5209d0b05070.png)

**EmailGPT** is a Google Chrome extension to use OpenAI's GPT-3.5 model's API to assist the user in writing emails inside Gmail.

What the extension can do:
 * AI generate an email based off a prompt
 * Enhance email and reply drafts with multiple flavours
    * Default: Normal enhancement
    * Corporate: Formal enhancement
    * Casual: Informal enhancement
    * Quirky: Speak like a zoomer (pls only use with your friends)
 * Automatically correct any spelling or grammar errors in the email

We made this for IEEE NTU's [iNTUition v9.0](https://intuition.ieeentu.com/), where we on the [**Best Pre-University Hack**](https://devpost.com/software/emailgpt).

## Built using:
 * [Google Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/)
 * [OpenAI GPT-3.5 Model](https://platform.openai.com/docs/models/gpt-3-5)
 * [Express.JS](https://expressjs.com/)
  
# Installation instructions (use at your own risk)

### Server
Grab your OpenAI key from [OpenAI's website](https://platform.openai.com/account/api-keys)

Create a `.env` file inside `\server` and enter the API key as `OPENAI_API_KEY=https://platform.openai.com/account/api-keys`

Afterwards, do `npm i` and `npm run dev` to run the express server.

### Extension
Inside `\extension` run `npm i` and `npm run build` to install dependencies and create the development version of the extension.

Head over to `chrome://extensions/` on your browser and toggle `Developer Mode`.

Click on `Load unpacked` and head over to the `\extension\dist` and upload the entire `\dist` folder.
