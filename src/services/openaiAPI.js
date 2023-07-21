import { Configuration, OpenAIApi } from 'openai';

export async function askGPT(apiKey, messages) {
  const configuration = new Configuration({
    apiKey
  });
  const openai = new OpenAIApi(configuration);
  try {
    const resp = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    });

    return resp;
  } catch (err) {
    return null;
  }
}
