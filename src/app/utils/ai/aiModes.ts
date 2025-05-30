
import {GoogleGenerativeAI} from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const aiModel =  async(prompt: string) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default aiModel




