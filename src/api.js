import axios from 'axios';

export const getMistralResponse = async (question) => {
  try {
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-tiny',
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
