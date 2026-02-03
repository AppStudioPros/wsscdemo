export function DisclaimerFooter() {
  return (
    <footer className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-6">PROPOSAL DEMO DISCLAIMER:</h3>
        <p className="text-gray-600 leading-relaxed mb-8">
          This is a conceptual demonstration created exclusively for WSSC Water's corporate website redesign RFP (Solicitation #89585, closing February 4, 2026) by{' '}
          <strong>Encore Services LLC</strong>{' '}
          <a 
            href="https://encoresvcsllc.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            (encoresvcsllc.com)
          </a>
          . All WSSC Water trademarks, logos, and brand assets are used under nominative fair use for proposal demonstration purposes only. This demo is not affiliated with, endorsed by, or representative of the current WSSC Water website.
        </p>
        <p className="text-gray-500 text-sm">
          © 2026 Encore Services LLC. Built for proposal evaluation purposes.
        </p>
      </div>
    </footer>
  );
}
