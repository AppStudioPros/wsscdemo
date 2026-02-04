'use client';

export function EncoreContactSection() {
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = url;
  };

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <a 
          href="https://encoresvcsllc.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block max-w-4xl mx-auto"
        >
          <div className="border-2 border-amber-500 rounded-2xl p-8 hover:border-amber-400 transition-colors">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left Content */}
              <div className="flex-1">
                <span className="text-blue-500 font-semibold text-sm tracking-wide">CONTACT</span>
                <h2 className="text-4xl font-serif font-bold text-white mt-2 mb-4">
                  Turn Ideas into Partnerships
                </h2>
                <p className="text-gray-400 mb-6">
                  Ready to transform WSSC Water's digital experience? Let's build the future together.
                </p>
                
                <div className="space-y-2 text-gray-300">
                  <p>Encore Services, LLC · 9500 Medical Center Drive, Suite 300, Largo, MD 20774</p>
                  <p>
                    <span 
                      onClick={(e) => handleLinkClick(e, 'tel:+12024608668')}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      (202) 460-8668
                    </span>
                  </p>
                  <p>
                    <span 
                      onClick={(e) => handleLinkClick(e, 'mailto:jwoodson@encoresvcsllc.com')}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      jwoodson@encoresvcsllc.com
                    </span>
                  </p>
                </div>
                
                <p className="text-amber-500 font-semibold mt-6">
                  Visit encoresvcsllc.com →
                </p>
              </div>
              
              {/* Right Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="https://customer-assets.emergentagent.com/job_e4309676-f936-468a-85ba-a6da5ef3628a/artifacts/qfcpow9u_es%20fava.png"
                  alt="Encore Services"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
