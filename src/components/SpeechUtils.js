// src/components/SpeechUtils.js

// --- Speech Synthesis (Text-to-Speech) ---
export function speak(
  text,
  {
    lang = 'en-US',
    rate = 0.97, // slightly slower for natural pacing
    pitch = 1.08, // slightly higher for a friendly female tone
    volume = 1,
    onStart,
    onEnd,
    preferredVoice = /female|zira|samantha|google us english|microsoft|apple/i
  } = {}
) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // Stop any current speech
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;

  // Pick the best available female/natural voice
  const voices = window.speechSynthesis.getVoices();
  let bestVoice = null;
  if (voices && voices.length) {
    // Prefer female voices
    bestVoice = voices.find(v => v.name && preferredVoice.test(v.name) && v.lang.startsWith(lang));
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith(lang) && v.gender === 'female');
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith(lang));
    if (!bestVoice) bestVoice = voices[0];
    if (bestVoice) utter.voice = bestVoice;
  }

  if (onStart) utter.onstart = onStart;
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
}

// --- Speech Recognition (Voice Input) ---
export function startListening({
  lang = 'en-US',
  onResult,
  onEnd,
  onError,
  onInterim,
  interimResults = true // enable interim by default for live transcript
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
    let finalTranscript = '';
    let interimTranscript = '';
    for (let i = 0; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    if (onResult && finalTranscript) onResult(finalTranscript);
    if (onInterim && interimTranscript) onInterim(interimTranscript);
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