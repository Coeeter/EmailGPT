# EmailGPT
![Group 37](https://user-images.githubusercontent.com/79391172/227707181-f482c411-64e2-4614-afa7-ee2f1edf326a.png)

**EmailGPT** is a Google Chrome extension to assist the user in writing emails inside Gmail using OpenAI's GPT-3.5 model.

What the extension can do:
 * AI generate an email based off a prompt
 * Enhance your emails and replies with multiple AI personalities
    * Default: Professional yet Approachable
    * Corporate: Formal and Polished
    * Casual: Informal and Friendly
    * Quirky: Zoomer mode (pls only use with your friends)
 * Automatically fix any spelling or grammatical errors in your emails

We made this for IEEE NTU's [iNTUition v9.0](https://intuition.ieeentu.com/), where we won the [**Best Pre-University Hack**](https://devpost.com/software/emailgpt).

## Built using:
 * [Google Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/)
 * [OpenAI GPT-3.5 Model](https://platform.openai.com/docs/models/gpt-3-5)
 * [Express.JS](https://expressjs.com/)
  
## Installation instructions (use at your own risk)

### Server
Grab your OpenAI key from [OpenAI's website](https://platform.openai.com/account/api-keys)

Create a `.env` file inside `\server` and enter the API key as `OPENAI_API_KEY=https://platform.openai.com/account/api-keys`

Afterwards, do `npm i` and `npm run dev` to run the express server.

### Extension
Inside `\extension` run `npm i` and `npm run build` to install dependencies and create the development version of the extension.

Head over to `chrome://extensions/` on your browser and toggle `Developer Mode`.

Click on `Load unpacked` and head over to the `\extension\dist` and upload the entire `\dist` folder.
