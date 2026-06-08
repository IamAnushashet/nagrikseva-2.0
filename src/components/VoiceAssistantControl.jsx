import { useState } from 'react';
import { FiMic, FiVolume2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function VoiceAssistantControl() {
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const navigate = useNavigate();
  const { speechLanguage, t } = useApp();

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLanguage;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function handleCommand(command) {
    const text = command.toLowerCase();
    setLastCommand(command);
    if (text.includes('complaint') || text.includes('शिकायत')) navigate('/complaints');
    else if (text.includes('track') || text.includes('status')) navigate('/track');
    else if (text.includes('digilocker') || text.includes('aadhaar') || text.includes('pan')) navigate('/digilocker');
    else if (text.includes('dashboard')) navigate('/dashboard');
    else if (text.includes('admin')) navigate('/admin');
    else if (text.includes('accessibility') || text.includes('settings')) navigate('/accessibility');
    else navigate('/dashboard');
    speak(command);
  }

  function startListening() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      speak('Speech recognition is not supported in this browser.');
      return;
    }
    const recognition = new Recognition();
    recognition.lang = speechLanguage;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => handleCommand(event.results[0][0].transcript);
    recognition.start();
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className={`flex h-10 w-10 items-center justify-center rounded border border-slate-200 focus:outline-none focus:ring-4 focus:ring-civic-100 ${
          listening ? 'bg-rose-50 text-rose-700' : 'text-slate-700 hover:bg-slate-50'
        }`}
        onClick={startListening}
        aria-label={listening ? t('stopListening') : t('startListening')}
        title={listening ? t('stopListening') : t('startListening')}
      >
        <FiMic aria-hidden="true" />
      </button>
      <button
        className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-civic-100"
        onClick={() => speak(lastCommand || t('voiceAssistant'))}
        aria-label={t('speakGuidance')}
        title={t('speakGuidance')}
      >
        <FiVolume2 aria-hidden="true" />
      </button>
    </div>
  );
}
