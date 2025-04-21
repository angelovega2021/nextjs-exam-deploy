import axios from 'axios';

const SLACK_URL = 'https://hooks.slack.com/services/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';


export default async function sendMessage(message, webhookUrl) {
    const data = {
        text: message 
    }
    
    try {
      const response = await axios.post(
        webhookUrl,
        JSON.stringify(data)
      );

      return response.data;
    } catch (error) {
        console.log(error);
    }
}