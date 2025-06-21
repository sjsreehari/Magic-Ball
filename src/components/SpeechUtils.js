// src/components/SpeechUtils.js

// --- Speech Synthesis (Text-to-Speech) ---
export function speak(text, { lang = 'en-US', rate = 1, pitch = 1, volume = 1 } = {}) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // Stop any current speech
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;
  window.speechSynthesis.speak(utter);
}

// --- Speech Recognition (Voice Input) ---
export function startListening({
  lang = 'en-US',
  onResult,
  onEnd,
  onError,
  interimResults = false
}) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (onError) onError(new Error('Speech recognition not supported'));
    return null;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = interimResults;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    if (onResult) onResult(transcript);
  };
  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };
  recognition.onend = () => {
    if (onEnd) onEnd();
  };
  recognition.start();
  return recognition;
}

export function stopListening(recognition) {
  if (recognition) recognition.stop();
} 