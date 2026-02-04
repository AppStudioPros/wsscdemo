'use client';

export default function Offline() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0066CC 0%, #003366 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 32px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '64px',
        }}>
          📡
        </div>
        
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '24px',
        }}>
          WSSC Water
        </div>
        
        <h1 style={{
          fontSize: '32px',
          marginBottom: '16px',
          fontWeight: '600',
        }}>
          You&apos;re Offline
        </h1>
        
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '24px',
          opacity: 0.9,
        }}>
          It looks like you&apos;ve lost your internet connection. Some features may be limited until you&apos;re back online.
        </p>
        
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'white',
            color: '#0066CC',
            border: 'none',
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '24px',
          }}
        >
          Try Again
        </button>

        <div style={{
          marginTop: '48px',
          textAlign: 'left',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '24px',
          borderRadius: '12px',
        }}>
          <h2 style={{
            fontSize: '20px',
            marginBottom: '16px',
          }}>
            Available Offline:
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {['View cached pages', 'Access previously loaded content', 'Browse saved information'].map((item, i) => (
              <li key={i} style={{
                padding: '8px 0',
                fontSize: '16px',
                opacity: 0.9,
              }}>
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
