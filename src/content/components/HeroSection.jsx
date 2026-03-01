import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function HeroSection({ title, subtitle, whatsapp, heroImage }) {
  const defaultMessage = encodeURIComponent(
    "Olá! Gostaria de mais informações sobre os serviços de advocacia."
  );

  const whatsappLink = `https://wa.me/${whatsapp}?text=${defaultMessage}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 mix-blend-multiply z-10"></div>
        <img
          src={heroImage || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
          alt="Escritório de Advocacia"
          className="w-full h-full object-cover animate-scaleIn"
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content - ADICIONADO PADDING TOP PARA COMPENSAR O HEADER */}
      <div className="container-custom px-4 md:px-6 lg:px-8 relative z-20 text-white">
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center lg:text-left pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32">
          {/* pt-16 no mobile, aumentando gradualmente até pt-32 em telas grandes */}
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-2 lg:mb-3 xl:mb-4 animate-fadeInUp">
            {title || 'Excelência e Compromisso em Direito'}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 lg:mb-5 xl:mb-6 opacity-90 animate-fadeInUp delay-200 max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
            {subtitle || 'Há mais de 12 anos defendendo seus direitos com ética, dedicação e soluções jurídicas eficientes.'}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 lg:gap-3 animate-fadeInUp delay-400">
            
            <Link
              to="/contato"
              className="group bg-accent text-primary px-5 lg:px-6 xl:px-7 py-2.5 lg:py-3 xl:py-3.5 rounded-full font-bold text-sm lg:text-base hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 hover:shadow-xl w-full sm:w-auto"
            >
              <span>Agende uma consulta</span>
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" 
              />
            </Link>
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-green-500 hover:bg-green-600 text-white px-5 lg:px-6 xl:px-7 py-2.5 lg:py-3 xl:py-3.5 rounded-full font-bold text-sm lg:text-base hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 hover:shadow-xl w-full sm:w-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <FontAwesomeIcon icon={faWhatsapp} className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>Fale pelo WhatsApp</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-5 xl:gap-6 mt-8 lg:mt-10 xl:mt-12 animate-fadeInUp delay-600">
            
            <div className="text-center">
              <p className="text-xl lg:text-2xl xl:text-3xl font-bold">12+</p>
              <p className="text-[10px] lg:text-xs opacity-80 whitespace-nowrap">Anos de experiência</p>
            </div>
            
            <div className="text-center">
              <p className="text-xl lg:text-2xl xl:text-3xl font-bold">350+</p>
              <p className="text-[10px] lg:text-xs opacity-80 whitespace-nowrap">Casos resolvidos</p>
            </div>
            
            <div className="text-center">
              <p className="text-xl lg:text-2xl xl:text-3xl font-bold">98%</p>
              <p className="text-[10px] lg:text-xs opacity-80 whitespace-nowrap">Clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-4 h-6 lg:w-5 lg:h-7 border-2 border-white rounded-full flex justify-center">
          <div className="w-0.5 h-1 lg:h-1.5 bg-white rounded-full mt-1 lg:mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-5 lg:top-16 lg:left-8 w-24 lg:w-32 xl:w-40 h-24 lg:h-32 xl:h-40 bg-accent/10 rounded-full blur-2xl lg:blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 lg:bottom-16 lg:right-8 w-32 lg:w-40 xl:w-48 h-32 lg:h-40 xl:h-48 bg-primary/20 rounded-full blur-2xl lg:blur-3xl animate-pulse delay-700"></div>
    </section>
  );
}