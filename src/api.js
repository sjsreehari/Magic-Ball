import axios from 'axios';

// Fallback responses for when API is not available
const fallbackResponses = [
  "The stars align in your favor. Yes, this path leads to success.",
  "The cosmic forces suggest patience. Wait for the right moment.",
  "A mysterious energy surrounds your question. The answer lies within.",
  "The universe whispers: trust your intuition on this matter.",
  "Ancient wisdom reveals: this is a time for bold action.",
  "The mystical forces are unclear. Seek clarity through meditation.",
  "Destiny points toward unexpected opportunities ahead.",
  "The cosmic alignment suggests: follow your heart's true calling.",
  "Mystical energies indicate: this choice will bring growth.",
  "The stars reveal: your path is guided by inner wisdom.",
  "Cosmic forces suggest: embrace change with open arms.",
  "The universe speaks: your question holds great significance.",
  "Mystical insights reveal: trust the journey unfolding.",
  "The stars align for transformation. Embrace the unknown.",
  "Cosmic wisdom advises: listen to your inner voice."
];

// Get a random fallback response
const getRandomFallback = () => {
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

// Format the response to be more mystical and engaging
const formatResponse = (response) => {
  const mysticalPrefixes = [
    "🔮 The Magic Ball reveals: ",
    "✨ Cosmic wisdom speaks: ",
    "🌟 The stars whisper: ",
    "🌙 Mystical forces say: ",
    "💫 The universe answers: ",
    "🔮 Ancient magic reveals: ",
    "✨ Destiny speaks: ",
    "🌟 The cosmic realm answers: "
  ];
  
  const prefix = mysticalPrefixes[Math.floor(Math.random() * mysticalPrefixes.length)];
  return prefix + response;
};

export const getMistralResponse = async (question) => {
  try {
    // Check if API key is available
    if (!process.env.REACT_APP_MISTRAL_API_KEY) {
      console.log('No API key found, using fallback response');
      return formatResponse(getRandomFallback());
    }

    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: 'You are a mystical Magic 8 Ball that provides mysterious, wise, and sometimes cryptic answers. Keep responses concise (1-2 sentences) and mystical in tone. Be encouraging but not overly specific.'
          },
          {
            role: 'user',
            content: question,
          },
        ],
        temperature: 0.8,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      }
    );

    const answer = response.data.choices[0].message.content.trim();
    return formatResponse(answer);
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    } else if (error.response?.status === 401) {
      throw new Error('API key is invalid. Using mystical fallback.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Using mystical fallback.');
    } else if (!navigator.onLine) {
      throw new Error('No internet connection. Using mystical fallback.');
    } else {
      // For any other error, use fallback
      return formatResponse(getRandomFallback());
    }
  }
};

// Additional utility function for getting quick responses
export const getQuickResponse = (question) => {
  const quickResponses = [
    "Yes, definitely! ✨",
    "No, not at this time. 🌙",
    "Ask again later. 🔮",
    "The signs point to yes! ⭐",
    "Don't count on it. 🌚",
    "It is certain! 🌟",
    "Very doubtful. 💫",
    "Without a doubt! 🔮",
    "My sources say no. 🌙",
    "Yes, without question! ✨"
  ];
  
  // Use question hash to get consistent response for same question
  const hash = question.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const index = Math.abs(hash) % quickResponses.length;
  return quickResponses[index];
};
