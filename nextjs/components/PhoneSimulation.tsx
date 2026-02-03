'use client';

import { useState, useEffect } from 'react';
import './phone-simulation.css';

export function PhoneSimulation() {
  const [phoneState, setPhoneState] = useState('homescreen');
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [typedText, setTypedText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ type: string; text: string; hasLink?: boolean }>>([]);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [showPayLink, setShowPayLink] = useState(false);

  const showTouch = (x: number, y: number) => {
    return new Promise<void>((resolve) => {
      setTouchPosition({ x, y });
      setTimeout(() => {
        setTouchPosition(null);
        resolve();
      }, 400);
    });
  };

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let isMounted = true;

    const runSimulation = async () => {
      if (!isMounted) return;

      // Reset all states
      setPhoneState('homescreen');
      setChatMessages([]);
      setTypedText('');
      setShowKeyboard(false);
      setShowTypingIndicator(false);
      setShowPayLink(false);

      await wait(3000);
      if (!isMounted) return;

      // Tap WSSC app icon
      await showTouch(65, 38);
      await wait(200);
      if (!isMounted) return;

      // App opening animation
      setPhoneState('app-opening');
      await wait(1800);
      if (!isMounted) return;

      // Dashboard slides in
      setPhoneState('dashboard');
      await wait(3500);
      if (!isMounted) return;

      // Tap AI Assistant button
      await showTouch(50, 90);
      await wait(300);
      if (!isMounted) return;

      // Chat screen slides in
      setPhoneState('chat');
      setChatMessages([]);
      setTypedText('');
      setShowPayLink(false);
      await wait(1200);
      if (!isMounted) return;

      // Show keyboard and start typing
      setShowKeyboard(true);
      await wait(800);
      if (!isMounted) return;

      // Type the question
      const question = 'How do I pay my bill?';
      setPhoneState('chat-typing');
      for (let i = 0; i <= question.length; i++) {
        if (!isMounted) return;
        setTypedText(question.slice(0, i));
        await wait(90);
      }
      await wait(800);
      if (!isMounted) return;

      // Send message
      await showTouch(90, 78);
      await wait(200);
      setChatMessages([{ type: 'user', text: question }]);
      setTypedText('');
      setShowKeyboard(false);
      await wait(800);
      if (!isMounted) return;

      // AI typing indicator
      setShowTypingIndicator(true);
      await wait(2500);
      if (!isMounted) return;

      // AI response with pay link
      setShowTypingIndicator(false);
      setShowPayLink(true);
      setChatMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'You can pay your bill directly in the app. Tap the Pay Bill button below, or click here:',
          hasLink: true,
        },
      ]);
      setPhoneState('chat-response');
      await wait(3500);
      if (!isMounted) return;

      // Tap Pay Bill link
      await showTouch(50, 62);
      await wait(300);
      if (!isMounted) return;

      // Bill Pay screen slides in
      setPhoneState('billpay');
      await wait(4000);
      if (!isMounted) return;

      // Tap Pay button
      await showTouch(50, 82);
      await wait(300);
      if (!isMounted) return;

      // Payment success
      setPhoneState('payment-success');
      await wait(3500);
      if (!isMounted) return;

      // Tap Done button
      await showTouch(50, 75);
      await wait(300);
      if (!isMounted) return;

      // Return to homescreen
      setPhoneState('returning-home');
      await wait(800);
      setPhoneState('homescreen');
      await wait(2000);
      if (!isMounted) return;

      // Loop
      runSimulation();
    };

    runSimulation();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
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
              <div className="sim-app">
                <div className="sim-icon messages"></div>
                <span>Messages</span>
              </div>
              <div className="sim-app">
                <div className="sim-icon phone"></div>
                <span>Phone</span>
              </div>
              <div className="sim-app">
                <div className="sim-icon mail"></div>
                <span>Mail</span>
              </div>
              <div className="sim-app">
                <div className="sim-icon safari"></div>
                <span>Safari</span>
              </div>
              <div className="sim-app">
                <div className="sim-icon facebook"></div>
                <span>Facebook</span>
              </div>
              <div className="sim-app">
                <div className="sim-icon x-twitter"></div>
                <span>X</span>
              </div>
              <div className="sim-app wssc-app">
                <img
                  src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png"
                  alt="WSSC"
                  className="sim-wssc-icon"
                />
                <span>WSSC Water</span>
              </div>
              <div className="sim-app">
                <div className="sim-icon camera"></div>
                <span>Camera</span>
              </div>
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

        {/* App Opening */}
        {phoneState === 'app-opening' && (
          <div className="sim-app-opening">
            <div className="sim-app-splash">
              <img
                src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png"
                alt="WSSC"
                className="splash-logo"
              />
              <div className="splash-loader"></div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {(phoneState === 'dashboard' || phoneState === 'dashboard-return') && (
          <div
            className={`sim-dashboard-v2 ${
              phoneState === 'dashboard-return' ? 'slide-from-left' : 'slide-from-right'
            }`}
          >
            <div className="dash-v2-status">
              <span>9:41</span>
              <div className="dash-v2-status-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            <div className="dash-v2-header">
              <h2>WSSC Water</h2>
              <p>Welcome back, Alex</p>
            </div>
            <div className="dash-v2-balance-card">
              <span className="dash-v2-balance-label">Current Balance</span>
              <span className="dash-v2-balance-amount">$127.35</span>
              <span className="dash-v2-due">Due February 15, 2026</span>
              <button className="dash-v2-pay-btn">Pay Bill</button>
            </div>
            <div className="dash-v2-quick-actions">
              <div className="dash-v2-action">
                <div className="dash-v2-action-icon usage">💧</div>
                <span>Usage</span>
              </div>
              <div className="dash-v2-action">
                <div className="dash-v2-action-icon history">🕐</div>
                <span>History</span>
              </div>
              <div className="dash-v2-action">
                <div className="dash-v2-action-icon alerts">🔔</div>
                <span>Alerts</span>
              </div>
              <div className="dash-v2-action">
                <div className="dash-v2-action-icon support">💬</div>
                <span>Support</span>
              </div>
            </div>
            <div className="dash-v2-ai-btn">
              <span>Ask AI Assistant</span>
            </div>
            <div className="dash-v2-nav">
              <div className="dash-v2-nav-item active">
                <span>🏠</span>
                <span>Home</span>
              </div>
              <div className="dash-v2-nav-item">
                <span>💧</span>
                <span>Usage</span>
              </div>
              <div className="dash-v2-nav-item">
                <span>📄</span>
                <span>Bills</span>
              </div>
              <div className="dash-v2-nav-item">
                <span>🔔</span>
                <span>Alerts</span>
              </div>
              <div className="dash-v2-nav-item">
                <span>👤</span>
                <span>Account</span>
              </div>
            </div>
          </div>
        )}

        {/* Chat Screen */}
        {(phoneState === 'chat' ||
          phoneState === 'chat-typing' ||
          phoneState === 'chat-response' ||
          phoneState === 'chat-closing') && (
          <div
            className={`sim-chat-v2 ${
              phoneState === 'chat-closing' ? 'slide-out-right' : 'slide-from-right'
            }`}
          >
            <div className="chat-v2-status">
              <span>9:41</span>
              <div className="chat-v2-status-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            <div className="chat-v2-header">
              <button className="chat-v2-back">←</button>
              <span className="chat-v2-title">WSSC Water AI Assistant</span>
            </div>
            <div className="chat-v2-quick-btns">
              <button className="chat-v2-quick-btn">Why is my bill high?</button>
              <button className="chat-v2-quick-btn">Report a leak</button>
              <button className="chat-v2-quick-btn">Payment help</button>
            </div>
            <div className="chat-v2-messages">
              <div className="chat-v2-bubble bot">
                Hello! I'm here to help with your WSSC Water account. How can I assist you today?
              </div>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-v2-bubble ${msg.type}`}>
                  {msg.text}
                  {msg.hasLink && showPayLink && <div className="chat-v2-link">[Pay Bill]</div>}
                </div>
              ))}
              {showTypingIndicator && (
                <div className="chat-v2-bubble bot typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              )}
            </div>
            <div className="chat-v2-input-area">
              <div className="chat-v2-input">
                {showKeyboard ? (
                  <>
                    {typedText}
                    <span className="cursor">|</span>
                  </>
                ) : (
                  <span className="placeholder">Message...</span>
                )}
              </div>
              <button className="chat-v2-send">Send</button>
            </div>
            <div className="chat-v2-nav">
              <div className="chat-v2-nav-item active">
                <span>🤖</span>
                <span>AI</span>
              </div>
              <div className="chat-v2-nav-item">
                <span>📧</span>
                <span>Account</span>
              </div>
              <div className="chat-v2-nav-item">
                <span>📧</span>
                <span>More</span>
              </div>
            </div>
          </div>
        )}

        {/* Bill Pay Screen */}
        {phoneState === 'billpay' && (
          <div className="sim-billpay slide-from-right">
            <div className="billpay-status">
              <span>9:41</span>
              <div className="billpay-status-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            <div className="billpay-header">
              <button className="billpay-back">←</button>
              <span>Pay Bill</span>
            </div>
            <div className="billpay-amount-card">
              <span className="billpay-label">Current Amount Due</span>
              <span className="billpay-amount">$127.35</span>
              <span className="billpay-due">Due February 15, 2026</span>
              <span className="billpay-account">Account ***4892</span>
            </div>
            <div className="billpay-section">
              <h4>Payment Method</h4>
              <div className="billpay-method">
                <span className="billpay-card-icon">💳</span>
                <div>
                  <span>Visa ending in 1234</span>
                  <span className="billpay-add-link">Add new payment method</span>
                </div>
              </div>
            </div>
            <div className="billpay-section">
              <h4>Amount to Pay</h4>
              <div className="billpay-amount-input">
                <span>$127.35</span>
                <span className="billpay-change">Change</span>
              </div>
              <div className="billpay-options">
                <label>
                  <span className="radio checked"></span> Full Amount
                </label>
                <label>
                  <span className="radio"></span> Other Amount
                </label>
              </div>
            </div>
            <button className="billpay-submit-btn">Pay $127.35</button>
            <div className="billpay-nav">
              <div className="billpay-nav-item active">
                <span>📄</span>
                <span>Bills</span>
              </div>
              <div className="billpay-nav-item">
                <span>🏠</span>
                <span>Home</span>
              </div>
              <div className="billpay-nav-item">
                <span>📊</span>
                <span>Activity</span>
              </div>
              <div className="billpay-nav-item">
                <span>👤</span>
                <span>Profile</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Success */}
        {phoneState === 'payment-success' && (
          <div className="sim-payment-success slide-from-right">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h3>Payment Successful!</h3>
              <p className="success-amount">$127.35</p>
              <p className="success-detail">Your payment has been processed successfully.</p>
              <p className="success-conf">Confirmation #WS2026-8847</p>
              <button className="success-btn">Done</button>
            </div>
          </div>
        )}

        {/* Returning Home */}
        {phoneState === 'returning-home' && (
          <div className="sim-returning">
            <div className="sim-app-closing">
              <img
                src="https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png"
                alt="WSSC"
                className="closing-logo"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
