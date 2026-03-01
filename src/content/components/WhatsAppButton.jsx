import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function WhatsAppButton({ whatsapp }) {
  const [show, setShow] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
      setShowTopButton(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const defaultMessage = encodeURIComponent(
    "Olá! Gostaria de mais informações sobre os serviços de advocacia."
  );

  const whatsappLink = `https://wa.me/${whatsapp}?text=${defaultMessage}`;

  return (
    <>
      {/* Botão do WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-50 transition-all duration-500 ${
          show 
            ? 'opacity-100 visible scale-100' 
            : 'opacity-0 invisible scale-50'
        } bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8`}
        aria-label="WhatsApp"
      >
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" style={{ transform: 'scale(1.1)' }}></div>
          <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-30" style={{ transform: 'scale(1.05)' }}></div>
          
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-2xl active:shadow-lg active:scale-95 transition-all duration-200 overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300"></div>
            
            <div className="p-3 sm:p-4 lg:p-5">
              <FontAwesomeIcon 
                icon={faWhatsapp} 
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 drop-shadow-xl"
              />
            </div>
          </div>

          <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2">
            <div className="relative">
              <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border border-white relative flex items-center justify-center">
                <span className="text-[6px] lg:text-[8px] font-bold text-white">✓</span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 lg:-bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900/90 text-white text-[10px] lg:text-xs py-1 px-2 lg:px-2.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp
            <span className="ml-1 text-green-400">●</span>
          </div>
        </div>
      </a>

      {/* Botão de Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        className={`fixed z-50 transition-all duration-500 ${
          showTopButton 
            ? 'opacity-100 visible scale-100' 
            : 'opacity-0 invisible scale-50'
        } bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8`}
        aria-label="Voltar ao topo"
      >
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-pulse opacity-20" style={{ transform: 'scale(1.05)' }}></div>
          
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/30 active:shadow-lg active:scale-95 transition-all duration-200 overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
            
            <div className="p-2.5 sm:p-3 lg:p-4">
              <FontAwesomeIcon 
                icon={faArrowUp} 
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 drop-shadow-lg"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 lg:-bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900/90 text-white text-[10px] lg:text-xs py-1 px-2 lg:px-2.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Voltar ao topo
          </div>
        </div>
      </button>
    </>
  );
}