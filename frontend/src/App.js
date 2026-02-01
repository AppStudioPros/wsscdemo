import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Simple markdown to HTML converter for chat messages
function formatMessage(text) {
  if (!text) return '';
  
  return text
    // Convert **bold** to <strong>
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em>
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Convert bullet points (• or - at start of line)
    .replace(/^[•\-]\s*/gm, '• ')
    // Convert numbered lists
    .replace(/^(\d+)\.\s*/gm, '$1. ')
    // Convert line breaks
    .replace(/\n/g, '<br>')
    // Convert --- to horizontal rule
    .replace(/<br>---<br>/g, '<hr style="margin: 12px 0; border: none; border-top: 1px solid #e0e0e0;">')
    // Clean up multiple <br> tags
    .replace(/(<br>){3,}/g, '<br><br>');
}

// Chatbot response data (fallback)
const chatResponses = {
  "What is my current water bill?": {
    text: `Let me pull up your account details. I see your current balance is <strong>$87.45</strong>, due on February 15, 2026.<br><br>📊 <strong>Usage:</strong> 4,200 gallons (12% below last month)<br>💰 <strong>Breakdown:</strong> Water $52.30 • Sewer $28.15 • Fees $7.00<br><br>Would you like to pay now or set up autopay?`,
    delay: 1500
  },
  "Why is my bill higher than usual?": {
    text: `I analyzed your usage and found your consumption increased by <strong>32% this month</strong> (5,500 gallons vs. usual 4,200).<br><br>🔍 <strong>Possible causes:</strong><br>• Jan 23-25: Spike of 800 gallons/day (normal is 140)<br>• This suggests a possible leak (running toilet, dripping faucet)<br><br>💡 <strong>Recommendation:</strong> Run our free leak detection guide. I can also connect you with our leak assistance program if needed.<br><br>Would you like me to send the leak check guide to your email?`,
    delay: 2000
  },
  "How do I report a water main break?": {
    text: `I'll help you report this emergency right away.<br><br>📍 <strong>Location:</strong> I see you're at 123 Main St, Silver Spring, MD<br>⚡ <strong>Priority:</strong> Water main breaks are handled 24/7<br><br><strong>Next steps:</strong><br>1. I've pre-filled the emergency form with your location<br>2. Click 'Submit Report' below to alert our crew<br>3. You'll receive text updates on repair progress<br><br>🚨 <strong>Estimated response:</strong> Crew dispatched within 30 minutes<br><br><em>[Submit Emergency Report Button]</em>`,
    delay: 1800
  },
  "What permits do I need for commercial construction?": {
    text: `I can help you navigate permit requirements. Let me ask a few quick questions:<br><br>📋 <strong>Project type:</strong> Commercial construction<br>🏢 <strong>Building details needed:</strong><br>• Square footage?<br>• Number of floors?<br>• Number of units/tenants?<br>• Location (county)?<br><br>Once you provide these details, I'll generate a complete checklist of required WSSC permits, estimated fees, timeline, and application links.<br><br><em>Example: A 3-story, 24-unit apartment typically requires Water Service Application (WS-200), Backflow Prevention Device, Fire Suppression Approval, and Sewer Capacity Study. Total fees ~$8,500, timeline 6-8 weeks.</em>`,
    delay: 2200
  }
};

// Animate count-up utility
function animateCount(element, targetValue, duration = 700) {
  if (!element) return;
  const start = performance.now();
  const from = 0;
  
  function step(currentTime) {
    const progress = Math.min((currentTime - start) / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(from + (targetValue - from) * eased);
    element.textContent = '$' + currentValue.toLocaleString('en-US');
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

// Hero Section with Video Background and Phone Mockup
function Hero() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [pwaStep, setPwaStep] = useState(0);
  const [roiValues, setRoiValues] = useState({ calls: 0, cost: 0, savings1: 0, savings2: 0, total: 0 });

  const scrollToAIFeatures = (e) => {
    e.preventDefault();
    document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scene rotation effect
  useEffect(() => {
    const sceneDurations = [7000, 8000, 7000]; // 7s, 8s, 7s for each scene
    
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScene((prev) => (prev + 1) % 3);
        setIsTransitioning(false);
      }, 800);
    }, sceneDurations[currentScene]);

    return () => clearTimeout(timer);
  }, [currentScene, isTransitioning]);

  // Scene 1: Chatbot conversation animation
  useEffect(() => {
    if (currentScene === 0) {
      // Reset messages when scene becomes active
      setChatMessages([]);
      setShowTyping(false);
      
      const conversation = [
        { type: 'user', text: 'Why is my bill $120 higher this month?', delay: 500 },
        { type: 'typing', delay: 1500 },
        { type: 'bot', text: 'I analyzed your usage and found a 32% increase. Possible leak detected Jan 23-25. Would you like the leak check guide?', delay: 2500 },
        { type: 'user', text: 'Yes, send the guide', delay: 4500 },
        { type: 'typing', delay: 5500 },
        { type: 'bot', text: 'Guide sent! You may qualify for up to 50% reduction on excess charges.', delay: 6500 }
      ];

      const timeouts = [];
      conversation.forEach(msg => {
        const timeout = setTimeout(() => {
          if (msg.type === 'typing') {
            setShowTyping(true);
          } else {
            setShowTyping(false);
            setChatMessages(prev => {
              // Prevent duplicates
              if (prev.some(m => m.text === msg.text)) return prev;
              return [...prev, { type: msg.type, text: msg.text }];
            });
          }
        }, msg.delay);
        timeouts.push(timeout);
      });

      return () => timeouts.forEach(t => clearTimeout(t));
    }
  }, [currentScene]);

  // Scene 2: PWA installation animation
  useEffect(() => {
    if (currentScene === 1) {
      setPwaStep(0);
      const steps = [
        { step: 1, delay: 500 },
        { step: 2, delay: 3500 },
        { step: 3, delay: 5500 }
      ];
      steps.forEach(s => {
        setTimeout(() => setPwaStep(s.step), s.delay);
      });
    }
  }, [currentScene]);

  // Scene 3: ROI calculator animation
  useEffect(() => {
    if (currentScene === 2) {
      setRoiValues({ calls: 0, cost: 0, savings1: 0, savings2: 0, total: 0 });
      
      // Animate call volume
      setTimeout(() => {
        let start = 0;
        const interval = setInterval(() => {
          start += 500;
          if (start >= 10000) {
            clearInterval(interval);
            setRoiValues(prev => ({ ...prev, calls: 10000 }));
          } else {
            setRoiValues(prev => ({ ...prev, calls: start }));
          }
        }, 50);
      }, 500);

      // Animate cost per call
      setTimeout(() => {
        let start = 0;
        const interval = setInterval(() => {
          start += 0.25;
          if (start >= 5) {
            clearInterval(interval);
            setRoiValues(prev => ({ ...prev, cost: 5 }));
          } else {
            setRoiValues(prev => ({ ...prev, cost: start }));
          }
        }, 50);
      }, 1500);

      // Animate savings
      setTimeout(() => {
        setRoiValues(prev => ({ ...prev, savings1: 180000 }));
      }, 3000);
      setTimeout(() => {
        setRoiValues(prev => ({ ...prev, savings2: 225000 }));
      }, 4000);
      setTimeout(() => {
        setRoiValues(prev => ({ ...prev, total: 405000 }));
      }, 5000);
    }
  }, [currentScene]);

  return (
    <section id="hero" className="hero-advanced">
      {/* Left Side - Video Background */}
      <div className="hero-left">
        {/* Video Background */}
        <video 
          className="hero-video-bg"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/ylicgxa5_water.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="hero-video-overlay"></div>
        <div className="hero-left-content">
          <img 
            src="https://customer-assets.emergentagent.com/job_wssc-digital-demo/artifacts/li5pnsrz_Wlogo-REVERSED-01.png" 
            alt="WSSC Water Logo" 
            className="hero-logo"
            data-testid="hero-logo"
          />
          <h1 className="hero-title">WSSC Water: Next Generation Website</h1>
          <p className="hero-tagline">Delivering the Essential — Powered by AI</p>
          <p className="hero-subtitle">
            Experience the future of utility websites. A modern, intelligent, and customer-focused digital platform 
            built with Next.js, React, AI, and PWA technology.
          </p>
          <button 
            onClick={scrollToAIFeatures} 
            className="cta-outline"
            data-testid="hero-primary-cta-button"
          >
            Explore AI Features
          </button>
        </div>
      </div>

      {/* Right Side - Phone Mockup */}
      <div className="hero-right">
        <div className="phone-mockup">
          <div className="phone-notch"></div>
          <div className="phone-screen">
            {/* Scene 1: AI Chatbot */}
            <div className={`phone-scene scene-chat ${currentScene === 0 ? 'active' : ''} ${isTransitioning && currentScene === 0 ? 'transitioning-out' : ''}`}>
              <div className="scene-chat-header">
                <div className="chat-status-dot"></div>
                <div>
                  <strong>WSSC Water AI</strong>
                  <small>Online</small>
                </div>
              </div>
              <div className="scene-chat-messages">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`scene-msg ${msg.type}`}>
                    {msg.text}
                  </div>
                ))}
                {showTyping && (
                  <div className="scene-msg bot">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                )}
              </div>
            </div>

            {/* Scene 2: PWA Installation */}
            <div className={`phone-scene scene-pwa ${currentScene === 1 ? 'active' : ''} ${isTransitioning && currentScene === 1 ? 'transitioning-out' : ''}`}>
              {pwaStep === 1 && (
                <div className="pwa-install-dialog">
                  <div className="pwa-dialog-header">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_wssc-digital-demo/artifacts/f3a4nyem_Wfavicon.png" 
                      alt="WSSC" 
                      className="pwa-dialog-icon"
                    />
                    <div>
                      <strong>Install "WSSC Water"?</strong>
                      <p>Add to home screen for quick access</p>
                    </div>
                  </div>
                  <div className="pwa-dialog-buttons">
                    <button className="pwa-btn-cancel">Cancel</button>
                    <button className="pwa-btn-install">Install</button>
                  </div>
                </div>
              )}
              {pwaStep === 2 && (
                <div className="pwa-installing">
                  <div className="pwa-spinner"></div>
                  <p>Installing WSSC Water...</p>
                </div>
              )}
              {pwaStep === 3 && (
                <div className="pwa-homescreen">
                  <div className="pwa-app-grid">
                    <div className="pwa-app-icon placeholder"></div>
                    <div className="pwa-app-icon placeholder"></div>
                    <div className="pwa-app-icon placeholder"></div>
                    <div className="pwa-app-icon wssc-icon">
                      <img 
                        src="https://customer-assets.emergentagent.com/job_wssc-digital-demo/artifacts/f3a4nyem_Wfavicon.png" 
                        alt="WSSC Water"
                      />
                      <span>WSSC Water</span>
                    </div>
                    <div className="pwa-app-icon placeholder"></div>
                    <div className="pwa-app-icon placeholder"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Scene 3: ROI Calculator */}
            <div className={`phone-scene scene-roi ${currentScene === 2 ? 'active' : ''} ${isTransitioning && currentScene === 2 ? 'transitioning-out' : ''}`}>
              <div className="roi-scene-header">
                <strong>Calculate Your Savings</strong>
                <small>See how AI reduces costs</small>
              </div>
              <div className="roi-scene-inputs">
                <div className="roi-input-row">
                  <label>Monthly Calls</label>
                  <span className="roi-value">{roiValues.calls.toLocaleString()}</span>
                </div>
                <div className="roi-input-row">
                  <label>Cost Per Call</label>
                  <span className="roi-value">${roiValues.cost.toFixed(2)}</span>
                </div>
              </div>
              <div className="roi-scene-results">
                <div className="roi-result-row">
                  <span>Call Deflection (30%)</span>
                  <span className="roi-amount">${roiValues.savings1.toLocaleString()}</span>
                </div>
                <div className="roi-result-row">
                  <span>Paper Bill Reduction</span>
                  <span className="roi-amount">${roiValues.savings2.toLocaleString()}</span>
                </div>
                <div className="roi-result-total">
                  <span>TOTAL SAVINGS</span>
                  <span className="roi-total-amount">${roiValues.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scene indicators */}
        <div className="scene-indicators">
          <span className={currentScene === 0 ? 'active' : ''}></span>
          <span className={currentScene === 1 ? 'active' : ''}></span>
          <span className={currentScene === 2 ? 'active' : ''}></span>
        </div>
      </div>
    </section>
  );
}

// Pain Points Section
function PainPoints() {
  return (
    <section id="pain-points" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Transforming Customer Experience</h2>
          <p className="section-subtitle">
            From fragmented, outdated experiences to a unified, intelligent platform that customers love. 
            This interactive demo showcases how AI and modern technology create seamless customer experiences.
          </p>
        </div>
        <div className="comparison-grid">
          <div className="comparison-card before" data-testid="pain-current-list">
            <h3>Current Challenges</h3>
            <ul>
              <li>Separate portals create fragmented user experience</li>
              <li>Customers struggle to find information quickly</li>
              <li>Basic search misses user intent</li>
              <li>Call center overwhelmed with routine questions</li>
              <li>Manual content updates slow down communications</li>
              <li>No proactive alerts for usage anomalies</li>
              <li>Limited self-service capabilities</li>
            </ul>
          </div>
          <div className="comparison-card after" data-testid="pain-solution-list">
            <h3>Our Solution</h3>
            <ul>
              <li>Unified experience: public site + customer portal + PWA</li>
              <li>AI-powered navigation understands what users need</li>
              <li>Intelligent search expands queries contextually</li>
              <li>AI chatbot deflects 30% of routine calls</li>
              <li>Instant content publishing via Sanity CMS</li>
              <li>AI detects usage spikes and suggests leak checks</li>
              <li>Complete self-service: billing, usage, requests, scheduling</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// AI Features Section
function AIFeatures() {
  const features = [
    {
      icon: '🤖',
      title: 'Intelligent Chatbot',
      description: 'Available 24/7 to answer billing questions, explain usage spikes, guide permit applications, and escalate complex issues to human agents with full context.',
      demo: '"Why is my bill $50 higher this month?" → AI analyzes usage patterns, weather data, compares to history, suggests leak check, offers payment plan options.'
    },
    {
      icon: '🔍',
      title: 'AI-Enhanced Search',
      description: 'Understands user intent beyond keywords. Expands "high bill" to billing disputes, leak detection, payment assistance, usage calculators, and conservation tips.',
      demo: 'Search: "lead pipe" → Returns: testing programs, replacement schedules, health impacts, filter recommendations, grant programs.'
    },
    {
      icon: '📊',
      title: 'Personalized Insights',
      description: 'Dashboard analyzes usage vs. similar households, flags anomalies, projects next bill, and delivers tailored conservation tips based on property type and season.',
      demo: '"Your usage is 15% below neighbors. Great job! Tip: Your irrigation uses 40% of water—consider smart timer to save $20/month."'
    },
    {
      icon: '📝',
      title: 'Auto-Generated Content',
      description: 'AI drafts public-facing project updates from engineering data and summarizes 50-page commission minutes into key decisions for the public.',
      demo: 'Project milestone reached → AI generates customer-friendly announcement emphasizing community benefits, timeline, and impact.'
    },
    {
      icon: '🛠️',
      title: 'Contractor Wizard',
      description: 'Conversational AI guides developers through complex permit requirements based on project type, size, and location—no more guessing.',
      demo: '"Building 3-story, 24-unit apartment" → AI outputs required permits, estimated fees ($8,500), timeline (6-8 weeks), and application links.'
    },
    {
      icon: '♿',
      title: 'Accessibility AI',
      description: 'Auto-generates descriptive alt text for images, simplifies technical jargon to 8th-grade reading level, and ensures WCAG 2.1 AA compliance.',
      demo: 'Technical doc: "Backflow prevention assemblage" → Plain language: "Device that stops contaminated water from flowing backward into clean supply."'
    }
  ];

  return (
    <section id="ai-features" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Encore's Exclusive, Custom Built, Self-Healing AI</h2>
          <p className="section-subtitle">
            Our proprietary AI technology transforms how customers interact with WSSC Water services—learning, adapting, and improving continuously.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" data-testid={`ai-feature-card-${index + 1}`}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-demo">{feature.demo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Chatbot Demo Section
function ChatbotDemo() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi there! I'm your WSSC Water assistant. I'm here to help with billing questions, payment options, leaks, service issues, and more. What can I help you with today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [prevMessageCount, setPrevMessageCount] = useState(1);
  const messagesContainerRef = useRef(null);
  const latestResponseRef = useRef(null);

  // Scroll to show the beginning of the AI response
  const scrollToResponseTop = () => {
    if (latestResponseRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const response = latestResponseRef.current;
      // Get the top of the response element and scroll container to show it
      // Use getBoundingClientRect for more accurate positioning
      const containerRect = container.getBoundingClientRect();
      const responseRect = response.getBoundingClientRect();
      const scrollOffset = responseRect.top - containerRect.top + container.scrollTop - 15;
      container.scrollTop = scrollOffset;
    }
  };

  // When typing indicator appears, scroll to bottom to show it
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

  // When a new bot message is added, scroll to show its beginning
  useEffect(() => {
    if (messages.length > prevMessageCount) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'bot' && messages.length > 1) {
        // Delay to ensure DOM is updated
        setTimeout(scrollToResponseTop, 200);
      }
      setPrevMessageCount(messages.length);
    }
  }, [messages, prevMessageCount]);

  // Real API call to backend
  const sendToAI = async (message) => {
    setIsTyping(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: sessionId
        }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      setSessionId(data.session_id);
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Chat API error:', error);
      setIsTyping(false);
      // Fallback to pre-programmed response if API fails
      const fallbackResponse = chatResponses[message];
      if (fallbackResponse) {
        setMessages(prev => [...prev, { type: 'bot', text: fallbackResponse.text }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
        }]);
      }
    }
  };

  const handleQuickQuestion = (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    sendToAI(question);
  };

  const handleSendMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    setMessages(prev => [...prev, { type: 'user', text: message }]);
    setInputValue('');
    sendToAI(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Why is my bill so high?",
    "I need help paying my bill",
    "I think I have a leak",
    "I have no water or low pressure",
    "Start or stop my service",
    "My water tastes or smells strange"
  ];

  return (
    <section id="chatbot" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Try the AI Assistant</h2>
          <p className="section-subtitle">
            These are the top questions our customers ask. Click any to see how AI can help.
          </p>
        </div>
        <div className="chat-container">
          <div className="chat-header">
            <div className="status"></div>
            <div className="chat-header-info">
              <strong>WSSC Water AI Assistant</strong>
              <small>Online - Here to help!</small>
            </div>
          </div>
          <div className="quick-questions">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question"
                onClick={() => handleQuickQuestion(question)}
                data-testid={`chat-quick-question-${index + 1}`}
              >
                {question}
              </button>
            ))}
          </div>
          <div className="chat-messages" ref={messagesContainerRef} role="log" aria-live="polite">
            {messages.map((message, index) => {
              // Add ref to the latest bot response (not the welcome message)
              const isLatestBotResponse = message.type === 'bot' && 
                index === messages.length - 1 && 
                messages.length > 1;
              
              return (
                <div 
                  key={index} 
                  className={`message ${message.type}`} 
                  data-testid={`chat-message-${index}`}
                  ref={isLatestBotResponse ? latestResponseRef : null}
                >
                  <div className="message-avatar">{message.type === 'bot' ? 'AI' : 'You'}</div>
                  <div 
                    className="message-content" 
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                  />
                </div>
              );
            })}
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">AI</div>
                <div className="message-content">
                  <div className="typing-indicator" role="status" aria-live="polite" data-testid="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              data-testid="chat-input"
              aria-label="Chat message input"
            />
            <button 
              className="chat-send" 
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

// PWA Mockup Section
function PWAMockup() {
  const benefits = [
    {
      icon: '📴',
      title: 'Offline Access',
      description: 'View bills and account info even without internet connection'
    },
    {
      icon: '🔔',
      title: 'Push Notifications',
      description: 'Get instant alerts for bill due dates, outages, and conservation tips'
    },
    {
      icon: '📲',
      title: 'No App Store Needed',
      description: 'Install directly from browser—no downloads, no updates to manage'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'App-like experience with instant loading and smooth animations'
    },
    {
      icon: '💰',
      title: 'Zero Platform Fees',
      description: 'No Apple App Store fees, no Google Play fees—100% cost savings on app distribution'
    },
    {
      icon: '🔄',
      title: 'Instant Updates',
      description: 'Updates deploy immediately—no waiting for app store approval or user downloads'
    },
    {
      icon: '🌐',
      title: 'One Codebase, All Devices',
      description: 'Works on iPhone, Android, tablets, and desktops with one development effort'
    },
    {
      icon: '👆',
      title: 'User Friendly',
      description: 'Familiar web experience—customers already know how to use it from day one'
    }
  ];

  return (
    <section id="pwa" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Progressive Web App. <span className="included-text">It's Included!</span></h2>
          <p className="section-subtitle">
            Native app experience without the App Store. Install once, access anywhere.
          </p>
        </div>
        
        {/* Big Red Banner */}
        <div className="pwa-savings-banner" data-testid="pwa-savings-banner">
          <div className="pwa-savings-content">
            <h3>🚫 NO MORE EXPENSIVE NATIVE APPS!</h3>
            <div className="pwa-savings-points">
              <p><strong>❌ No Apple App Store</strong> — Save $99/year developer fee + 15-30% commission on in-app purchases</p>
              <p><strong>❌ No Google Play Store</strong> — Save $25 developer fee + 15-30% commission on transactions</p>
              <p><strong>❌ No Dual Development</strong> — Save $50,000-$150,000 on building separate iOS & Android apps</p>
              <p><strong>❌ No App Maintenance Hell</strong> — Save ongoing costs of maintaining two separate codebases</p>
            </div>
            <div className="pwa-benefits-summary">
              <span className="benefit-tag">✓ FASTER</span>
              <span className="benefit-tag">✓ CHEAPER</span>
              <span className="benefit-tag">✓ EASIER</span>
              <span className="benefit-tag">✓ SAME FUNCTIONALITY</span>
              <span className="benefit-tag">✓ USER FRIENDLY</span>
            </div>
            <p className="pwa-included-note">All of this is <strong>ALREADY INCLUDED</strong> in your quote—no extra charge!</p>
          </div>
        </div>

        <div className="pwa-container">
          <div className="iphone-frame" data-testid="iphone-frame">
            <div className="iphone-notch"></div>
            <div className="iphone-screen">
              <div className="pwa-app-header">
                <img 
                  src="https://customer-assets.emergentagent.com/job_wssc-digital-demo/artifacts/f3a4nyem_Wfavicon.png" 
                  alt="WSSC Water" 
                  className="pwa-app-logo-img"
                />
                <h4>WSSC Water</h4>
                <p>Your Water, Your Way</p>
              </div>
              <div className="pwa-app-content">
                <div className="pwa-menu-item">
                  <div className="pwa-menu-icon">💧</div>
                  <span>View Current Bill</span>
                </div>
                <div className="pwa-menu-item">
                  <div className="pwa-menu-icon">📊</div>
                  <span>Usage Analytics</span>
                </div>
                <div className="pwa-menu-item">
                  <div className="pwa-menu-icon">⚠️</div>
                  <span>Report Issue</span>
                </div>
              </div>
              <div className="a2hs-overlay" data-testid="pwa-install-overlay">
                <div className="a2hs-header">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_wssc-digital-demo/artifacts/f3a4nyem_Wfavicon.png" 
                    alt="WSSC Water" 
                    className="a2hs-icon-img"
                  />
                  <div className="a2hs-text">
                    <h5>Add to Home Screen</h5>
                    <p>wsscwater.com</p>
                  </div>
                </div>
                <div className="a2hs-buttons">
                  <button className="a2hs-button secondary" data-testid="pwa-install-cancel">Cancel</button>
                  <button className="a2hs-button primary" data-testid="pwa-install-confirm">Add</button>
                </div>
              </div>
            </div>
          </div>
          <div className="pwa-benefits">
            <h3>App-Like Experience, No Download</h3>
            <ul className="pwa-benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index} data-testid={`pwa-benefit-${index + 1}`}>
                  <div className="benefit-icon">{benefit.icon}</div>
                  <div className="benefit-text">
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Tech Stack Section
function TechStack() {
  const techItems = [
    { icon: '⚛️', name: 'Next.js + React', description: 'Lightning-fast performance, SEO-optimized, scalable to millions of users', testId: 'tech-item-nextjs' },
    { icon: '🎨', name: 'Sanity CMS', description: 'Real-time content updates, no IT dependency, version control', testId: 'tech-item-sanity' },
    { icon: '🚀', name: 'Vercel Hosting', description: 'Global edge network, automatic scaling, 99.9% uptime SLA', testId: 'tech-item-vercel' },
    { icon: '🐍', name: 'Python APIs', description: 'Seamless integration with Oracle billing, GIS, work orders', testId: 'tech-item-python' },
    { icon: '🧠', name: "Encore's Self-Healing AI", description: 'Custom built, exclusive AI that learns, adapts, and continuously improves—accurate & safe', testId: 'tech-item-claude' },
    { icon: '📱', name: 'PWA', description: 'Offline access, installable, push notifications—app-like experience', testId: 'tech-item-pwa' }
  ];

  return (
    <section id="tech-stack" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Enterprise-Grade Technology</h2>
          <p className="section-subtitle">
            Built on proven, modern technologies trusted by Fortune 500 companies.
          </p>
        </div>
        <div className="stack-grid">
          {techItems.map((item, index) => (
            <div key={index} className="stack-item" data-testid={item.testId}>
              <div className="icon">{item.icon}</div>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ROI Calculator Section
function ROICalculator() {
  const [callVolume, setCallVolume] = useState(10000);
  const [costPerCall, setCostPerCall] = useState(5);
  const [paperBills, setPaperBills] = useState(600000);
  const [billCost, setBillCost] = useState(1.5);
  
  const callSavingsRef = useRef(null);
  const billSavingsRef = useRef(null);
  const totalSavingsRef = useRef(null);
  
  const prevValuesRef = useRef({ callSavings: 0, billSavings: 0, totalSavings: 0 });

  const calculateROI = () => {
    // Call deflection: 30% reduction
    const callSavings = Math.round(callVolume * 12 * 0.30 * costPerCall);
    // Paper bill reduction: 25% shift to e-bill
    const billSavings = Math.round(paperBills * 0.25 * billCost);
    const totalSavings = callSavings + billSavings;

    return { callSavings, billSavings, totalSavings };
  };

  const { callSavings, billSavings, totalSavings } = calculateROI();

  useEffect(() => {
    const prev = prevValuesRef.current;
    
    if (prev.callSavings !== callSavings && callSavingsRef.current) {
      animateCount(callSavingsRef.current, callSavings);
    }
    if (prev.billSavings !== billSavings && billSavingsRef.current) {
      animateCount(billSavingsRef.current, billSavings);
    }
    if (prev.totalSavings !== totalSavings && totalSavingsRef.current) {
      animateCount(totalSavingsRef.current, totalSavings);
    }

    prevValuesRef.current = { callSavings, billSavings, totalSavings };
  }, [callSavings, billSavings, totalSavings]);

  // Initialize values on mount
  useEffect(() => {
    if (callSavingsRef.current) callSavingsRef.current.textContent = '$' + callSavings.toLocaleString();
    if (billSavingsRef.current) billSavingsRef.current.textContent = '$' + billSavings.toLocaleString();
    if (totalSavingsRef.current) totalSavingsRef.current.textContent = '$' + totalSavings.toLocaleString();
    prevValuesRef.current = { callSavings, billSavings, totalSavings };
  }, []);

  return (
    <section id="roi" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Calculate Your ROI</h2>
          <p className="section-subtitle">
            See how AI-powered self-service saves money and improves customer satisfaction.
          </p>
        </div>
        <div className="roi-calculator">
          <h3>Projected Annual Savings</h3>
          <div className="roi-inputs">
            <div className="roi-input-group">
              <label htmlFor="callVolume">Monthly Call Center Volume:</label>
              <input
                type="number"
                id="callVolume"
                value={callVolume}
                onChange={(e) => setCallVolume(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                data-testid="roi-input-monthly-calls"
                aria-label="Monthly call center volume"
              />
            </div>
            <div className="roi-input-group">
              <label htmlFor="costPerCall">Average Cost per Call ($):</label>
              <input
                type="number"
                id="costPerCall"
                value={costPerCall}
                onChange={(e) => setCostPerCall(Math.max(0, parseFloat(e.target.value) || 0))}
                min="0"
                step="0.5"
                data-testid="roi-input-cost-per-call"
                aria-label="Average cost per call"
              />
            </div>
            <div className="roi-input-group">
              <label htmlFor="paperBills">Annual Paper Bill Volume:</label>
              <input
                type="number"
                id="paperBills"
                value={paperBills}
                onChange={(e) => setPaperBills(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                data-testid="roi-input-paper-bills"
                aria-label="Annual paper bill volume"
              />
            </div>
            <div className="roi-input-group">
              <label htmlFor="billCost">Cost per Paper Bill ($):</label>
              <input
                type="number"
                id="billCost"
                value={billCost}
                onChange={(e) => setBillCost(Math.max(0, parseFloat(e.target.value) || 0))}
                min="0"
                step="0.1"
                data-testid="roi-input-bill-cost"
                aria-label="Cost per paper bill"
              />
            </div>
          </div>
          <div className="roi-results">
            <h4>Estimated Annual Savings</h4>
            <div className="roi-metric" data-testid="roi-metric-call-savings">
              <span>Call Deflection (30% reduction):</span>
              <span ref={callSavingsRef} data-testid="roi-result-call-savings">$180,000</span>
            </div>
            <div className="roi-metric" data-testid="roi-metric-bill-savings">
              <span>Paper Bill Reduction (25% shift to e-bill):</span>
              <span ref={billSavingsRef} data-testid="roi-result-bill-savings">$225,000</span>
            </div>
            <div className="roi-metric total" data-testid="roi-metric-total">
              <span><strong>Total Year 1 Savings:</strong></span>
              <span ref={totalSavingsRef} data-testid="roi-result-annual-savings">$405,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTA() {
  const scrollToTop = (e) => {
    e.preventDefault();
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="final-cta" className="section">
      <div className="container">
        <h2>Ready to Transform WSSC Water's Digital Experience?</h2>
        <p>
          This is more than a website—it's a platform that reduces costs, improves service, and positions 
          WSSC Water as a modern utility leader. Let's build the future together.
        </p>
        <div className="cta-buttons">
          <a 
            href="mailto:bid@wsscwater.com?subject=Website Proposal - Next Steps" 
            className="cta-primary"
            data-testid="final-cta-start-button"
          >
            Schedule a Demo Call
          </a>
          <button 
            onClick={scrollToTop} 
            className="cta-secondary"
            data-testid="final-cta-back-top-button"
          >
            Back to Top
          </button>
        </div>
        <p className="project-details">
          <strong>Proposal Deadline:</strong> February 4, 2026 | 
          <strong> Build Timeline:</strong> 17 weeks | 
          <strong> Investment:</strong> $300k-$400k
        </p>
      </div>
    </section>
  );
}

// Legal Footer
function LegalFooter() {
  return (
    <footer id="legal">
      <div className="legal-content">
        <p className="legal-disclaimer" data-testid="legal-footer-disclaimer-text">
          <strong>PROPOSAL DEMO DISCLAIMER:</strong><br />
          This is a conceptual demonstration created exclusively for WSSC Water's corporate website redesign RFP 
          (Solicitation #89585, closing February 4, 2026) by <strong>Encore Services LLC</strong> (<a 
            href="https://encoresvcsllc.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >encoresvcsllc.com</a>). 
          All WSSC Water trademarks, logos, and brand assets are used under nominative fair use for proposal demonstration 
          purposes only. This demo is not affiliated with, endorsed by, or representative of the current WSSC Water website.
        </p>
        <p className="legal-copyright">
          © 2026 Encore Services LLC. Built for proposal evaluation purposes.
        </p>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <main>
        <Hero />
        <PainPoints />
        <AIFeatures />
        <ChatbotDemo />
        <PWAMockup />
        <TechStack />
        <ROICalculator />
        <FinalCTA />
      </main>
      <LegalFooter />
    </div>
  );
}

export default App;
