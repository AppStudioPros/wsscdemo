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

// Hero Section with Video Background and Realistic Phone Simulation
function Hero() {
  const videoRef = useRef(null);
  
  // Phone simulation state
  const [phoneState, setPhoneState] = useState('homescreen'); // homescreen, app-opening, dashboard, chat-opening, chat, chat-typing, chat-response, calculator-opening, calculator
  const [touchPosition, setTouchPosition] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({ calls: 0, savings: 0 });

  // Set video playback speed to 90% (10% slower)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  const scrollToAIFeatures = (e) => {
    e.preventDefault();
    document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Touch indicator helper
  const showTouch = (x, y, callback, delay = 300) => {
    setTouchPosition({ x, y });
    setTimeout(() => {
      setTouchPosition(null);
      if (callback) callback();
    }, delay);
  };

  // Main animation sequence
  useEffect(() => {
    const runSimulation = async () => {
      // Start on homescreen
      setPhoneState('homescreen');
      await wait(2000);
      
      // Tap WSSC app icon
      showTouch(65, 280, () => {
        setPhoneState('app-opening');
      });
      await wait(1500);
      
      // Show dashboard
      setPhoneState('dashboard');
      await wait(2500);
      
      // Tap AI chat button
      showTouch(85, 92, () => {
        setPhoneState('chat-opening');
      });
      await wait(800);
      
      // Show chat screen with keyboard
      setPhoneState('chat');
      setChatMessages([]);
      setTypedText('');
      await wait(500);
      setShowKeyboard(true);
      await wait(800);
      
      // Type the question character by character
      const question = "Why is my bill high this month?";
      setPhoneState('chat-typing');
      for (let i = 0; i <= question.length; i++) {
        setTypedText(question.slice(0, i));
        await wait(60);
      }
      await wait(500);
      
      // Send message
      setChatMessages([{ type: 'user', text: question }]);
      setTypedText('');
      setShowKeyboard(false);
      await wait(600);
      
      // Show typing indicator
      setShowTypingIndicator(true);
      await wait(2000);
      
      // Show AI response
      setShowTypingIndicator(false);
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        text: "I found a 32% usage increase from Jan 23-25. This may indicate a leak. Would you like the leak detection guide?" 
      }]);
      setPhoneState('chat-response');
      await wait(4000);
      
      // Close chat - swipe down
      setPhoneState('chat-closing');
      await wait(500);
      
      // Back to dashboard
      setPhoneState('dashboard');
      await wait(1500);
      
      // Tap calculator
      showTouch(50, 75, () => {
        setPhoneState('calculator-opening');
      });
      await wait(800);
      
      // Show calculator with animated values
      setPhoneState('calculator');
      await wait(500);
      
      // Animate calculator values
      const animateValue = (target, setter, key, duration = 1500) => {
        const steps = 30;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setter(prev => ({ ...prev, [key]: Math.round(current) }));
        }, duration / steps);
      };
      
      animateValue(15000, setCalculatorValues, 'calls');
      await wait(500);
      animateValue(180000, setCalculatorValues, 'savings');
      await wait(4000);
      
      // Loop back to homescreen
      setPhoneState('returning');
      await wait(800);
      setPhoneState('homescreen');
      await wait(1000);
      
      // Restart the simulation
      runSimulation();
    };
    
    runSimulation();
    
    return () => {
      // Cleanup if component unmounts
    };
  }, []);

  // Helper function for delays
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <section id="hero" className="hero-advanced">
      {/* Video Background - spans entire hero section */}
      <video 
        ref={videoRef}
        className="hero-video-bg"
        autoPlay 
        muted 
        playsInline
        preload="auto"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23ffffff' width='1' height='1'/%3E%3C/svg%3E"
      >
        <source src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/ylicgxa5_water.mp4" type="video/mp4" />
      </video>
      
      {/* Left Side - Content */}
      <div className="hero-left">
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

      {/* Right Side - Realistic Phone Simulation */}
      <div className="hero-right">
        <div className="phone-mockup">
          <div className="phone-notch"></div>
          <div className="phone-screen">
            {/* Touch Indicator */}
            {touchPosition && (
              <div 
                className="touch-indicator"
                style={{ left: `${touchPosition.x}%`, top: `${touchPosition.y}%` }}
              />
            )}
            
            {/* Homescreen */}
            {phoneState === 'homescreen' && (
              <div className="sim-homescreen">
                <div className="sim-status-bar">
                  <span className="sim-time">9:41</span>
                  <div className="sim-status-icons">
                    <span className="sim-signal">●●●●○</span>
                    <span className="sim-battery">🔋</span>
                  </div>
                </div>
                <div className="sim-app-grid">
                  <div className="sim-app"><div className="sim-icon messages"></div><span>Messages</span></div>
                  <div className="sim-app"><div className="sim-icon phone"></div><span>Phone</span></div>
                  <div className="sim-app"><div className="sim-icon mail"></div><span>Mail</span></div>
                  <div className="sim-app"><div className="sim-icon safari"></div><span>Safari</span></div>
                  <div className="sim-app"><div className="sim-icon facebook"></div><span>Facebook</span></div>
                  <div className="sim-app"><div className="sim-icon x-twitter"></div><span>X</span></div>
                  <div className="sim-app wssc-app">
                    <img src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png" alt="WSSC" className="sim-wssc-icon" />
                    <span>WSSC Water</span>
                  </div>
                  <div className="sim-app"><div className="sim-icon camera"></div><span>Camera</span></div>
                </div>
                <div className="sim-dock">
                  <div className="sim-dock-icon phone"></div>
                  <div className="sim-dock-icon safari"></div>
                  <div className="sim-dock-icon messages"></div>
                  <div className="sim-dock-icon music"></div>
                </div>
                <div className="sim-home-indicator"></div>
              </div>
            )}
            
            {/* App Opening Animation */}
            {phoneState === 'app-opening' && (
              <div className="sim-app-opening">
                <div className="sim-app-splash">
                  <img src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png" alt="WSSC" className="splash-logo" />
                  <div className="splash-loader"></div>
                </div>
              </div>
            )}
            
            {/* Dashboard */}
            {(phoneState === 'dashboard' || phoneState === 'chat-opening' || phoneState === 'calculator-opening' || phoneState === 'returning') && (
              <div className={`sim-dashboard ${phoneState === 'returning' ? 'slide-in' : ''}`}>
                <div className="dash-header">
                  <img src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png" alt="WSSC" className="dash-logo" />
                  <span>WSSC Water</span>
                </div>
                <div className="dash-welcome">
                  <h3>Welcome back!</h3>
                  <p>Account: ****4521</p>
                </div>
                <div className="dash-balance">
                  <span className="balance-label">Current Balance</span>
                  <span className="balance-amount">$127.43</span>
                  <button className="dash-pay-btn">Pay Now</button>
                </div>
                <div className="dash-quick-actions">
                  <div className="dash-action">
                    <span className="action-icon">💧</span>
                    <span>Usage</span>
                  </div>
                  <div className="dash-action calculator-btn">
                    <span className="action-icon">💰</span>
                    <span>Savings</span>
                  </div>
                  <div className="dash-action">
                    <span className="action-icon">📋</span>
                    <span>Bills</span>
                  </div>
                  <div className="dash-action">
                    <span className="action-icon">🔧</span>
                    <span>Service</span>
                  </div>
                </div>
                <div className="dash-ai-btn">
                  <span>💬</span>
                  <span>Ask AI Assistant</span>
                </div>
              </div>
            )}
            
            {/* Chat Screen */}
            {(phoneState === 'chat' || phoneState === 'chat-typing' || phoneState === 'chat-response' || phoneState === 'chat-closing') && (
              <div className={`sim-chat ${phoneState === 'chat-closing' ? 'slide-down' : 'slide-up'}`}>
                <div className="chat-header">
                  <button className="chat-back">←</button>
                  <div className="chat-title">
                    <strong>AI Assistant</strong>
                    <small>Online</small>
                  </div>
                  <div className="chat-avatar">🤖</div>
                </div>
                <div className="chat-messages">
                  <div className="chat-welcome">
                    <p>Hi! I'm your WSSC Water AI assistant. How can I help you today?</p>
                  </div>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`chat-bubble ${msg.type}`}>
                      {msg.text}
                    </div>
                  ))}
                  {showTypingIndicator && (
                    <div className="chat-bubble bot typing">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  )}
                </div>
                {showKeyboard && (
                  <div className="chat-input-area">
                    <div className="chat-input">
                      {typedText}<span className="cursor">|</span>
                    </div>
                  </div>
                )}
                {showKeyboard && (
                  <div className="sim-keyboard">
                    <div className="kb-row">QWERTYUIOP</div>
                    <div className="kb-row">ASDFGHJKL</div>
                    <div className="kb-row">ZXCVBNM</div>
                    <div className="kb-row space">space</div>
                  </div>
                )}
              </div>
            )}
            
            {/* Calculator Screen */}
            {phoneState === 'calculator' && (
              <div className="sim-calculator slide-up">
                <div className="calc-header">
                  <button className="chat-back">←</button>
                  <span>Savings Calculator</span>
                </div>
                <div className="calc-content">
                  <div className="calc-hero">
                    <span className="calc-label">Potential Annual Savings</span>
                    <span className="calc-amount">${calculatorValues.savings.toLocaleString()}</span>
                  </div>
                  <div className="calc-stat">
                    <span>Calls Deflected</span>
                    <span className="calc-value">{calculatorValues.calls.toLocaleString()}</span>
                  </div>
                  <div className="calc-stat">
                    <span>Cost per Call</span>
                    <span className="calc-value">$12.00</span>
                  </div>
                  <div className="calc-stat highlight">
                    <span>Your Savings</span>
                    <span className="calc-value">${calculatorValues.savings.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                  src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png" 
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
                    src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png" 
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

// Admin Dashboard Showcase Section
function AdminDashboard() {
  const [activeScreen, setActiveScreen] = useState(0);
  
  const screens = [
    {
      title: "Emergency Alerts",
      description: "Instantly notify customers about water main breaks, boil advisories, and service disruptions with one click.",
      image: "https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/1ihe4f6m_emergency%20alerts%20page.png"
    },
    {
      title: "Service Announcements", 
      description: "Schedule and manage maintenance notices, conservation tips, and important updates with live preview.",
      image: "https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/xg6823tj_Service%20Announcements.png"
    },
    {
      title: "Blog & Content",
      description: "Create engaging content with AI writing assistance and see exactly how it will look before publishing.",
      image: "https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/3wu00hg8_blog%20posts.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [screens.length]);

  return (
    <section id="admin-dashboard" className="admin-dashboard-section" data-testid="admin-dashboard-section">
      <div className="container">
        <div className="admin-header">
          <span className="section-badge">Your Command Center</span>
          <h2>New Technology Doesn't Have to Be Scary</h2>
          <p className="admin-subtitle">
            We'll provide WSSC Water with a custom admin dashboard that's <strong>intuitive, powerful, and easy to use</strong>. 
            No technical expertise required — your team will be managing content like pros from day one.
          </p>
        </div>
        
        <div className="admin-content">
          <div className="admin-features">
            {screens.map((screen, index) => (
              <div 
                key={index}
                className={`admin-feature-card ${activeScreen === index ? 'active' : ''}`}
                onClick={() => setActiveScreen(index)}
                data-testid={`admin-feature-${index}`}
              >
                <div className="feature-indicator"></div>
                <div className="feature-content">
                  <h4>{screen.title}</h4>
                  <p>{screen.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="admin-preview">
            <div className="browser-mockup">
              <div className="browser-header">
                <div className="browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="browser-url">admin.wsscwater.com</div>
              </div>
              <div className="browser-content">
                <img 
                  src={screens[activeScreen].image} 
                  alt={screens[activeScreen].title}
                  className="admin-screenshot"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="admin-benefits">
          <div className="benefit-item">
            <div className="benefit-icon">🎯</div>
            <span>Zero Learning Curve</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">⚡</div>
            <span>Real-Time Updates</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🤖</div>
            <span>AI-Powered Assistance</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">👀</div>
            <span>Live Preview</span>
          </div>
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
        <AdminDashboard />
        <ROICalculator />
        <FinalCTA />
      </main>
      <LegalFooter />
    </div>
  );
}

export default App;
