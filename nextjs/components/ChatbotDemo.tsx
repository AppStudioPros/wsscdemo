'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

interface ChatbotDemoProps {
  welcomeMessage?: string;
  quickQuestions?: string[];
}

function formatMessage(text: string) {
  if (!text) return '';

  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^[•\-]\s*/gm, '• ')
    .replace(/^(\d+)\.\s*/gm, '$1. ')
    .replace(/\n/g, '<br>')
    .replace(/<br>---<br>/g, '<hr style="margin: 12px 0; border: none; border-top: 1px solid #e0e0e0;">')
    .replace(/(<br>){3,}/g, '<br><br>');
}

export function ChatbotDemo({ welcomeMessage, quickQuestions }: ChatbotDemoProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      text:
        welcomeMessage ||
        "Hi there! I'm your WSSC Water assistant. I'm here to help with billing questions, payment options, leaks, service issues, and more. What can I help you with today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const latestResponseRef = useRef<HTMLDivElement>(null);

  const defaultQuickQuestions = [
    'Why is my bill so high?',
    'I need financial assistance',
    'I think I have a leak',
    'I have no water or low pressure',
    'Start or stop my service',
    'My water tastes or smells strange',
  ];

  const questions = quickQuestions || defaultQuickQuestions;

  const scrollToResponseTop = () => {
    if (latestResponseRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const response = latestResponseRef.current;
      const containerRect = container.getBoundingClientRect();
      const responseRect = response.getBoundingClientRect();
      const scrollOffset = responseRect.top - containerRect.top + container.scrollTop - 15;
      container.scrollTop = scrollOffset;
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping]);

  const sendToAI = async (message: string) => {
    setIsTyping(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setSessionId(data.session_id);
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: 'bot', text: data.response }]);
      setTimeout(scrollToResponseTop, 200);
    } catch (error) {
      console.error('Chat API error:', error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessages((prev) => [...prev, { type: 'user', text: question }]);
    sendToAI(question);
  };

  const handleSendMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { type: 'user', text: message }]);
    setInputValue('');
    sendToAI(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section id="chatbot" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Try the AI Assistant</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These are the top questions our customers ask. Click any to see how AI can help.
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4 flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <div>
              <strong className="block">WSSC Water AI Assistant</strong>
              <small className="text-blue-100">Online - Here to help!</small>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50">
            {questions.map((question, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={() => handleQuickQuestion(question)}
                data-testid={`chat-quick-question-${index + 1}`}
              >
                {question}
              </button>
            ))}
          </div>
          <div
            className="h-96 overflow-y-auto p-6 space-y-4"
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
          >
            {messages.map((message, index) => {
              const isLatestBotResponse =
                message.type === 'bot' && index === messages.length - 1 && messages.length > 1;

              return (
                <div
                  key={index}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                  data-testid={`chat-message-${index}`}
                  ref={isLatestBotResponse ? latestResponseRef : null}
                >
                  <div
                    className={`max-w-md rounded-lg px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                    />
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex space-x-2" role="status" aria-live="polite" data-testid="typing-indicator">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 p-4 flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your question here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              data-testid="chat-input"
              aria-label="Chat message input"
            />
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSendMessage}
              data-testid="chat-send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
