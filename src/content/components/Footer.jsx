import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhoneAlt, 
  faEnvelope, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faInstagram, 
  faTiktok, 
  faFacebookF, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

export default function Footer({ siteName, oab, phone, email, address, whatsapp }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    instagram: "https://www.instagram.com/edsonmaltezadvocacia?igsh=cmVtNjUyZHlmZDZ3&utm_source=qr",
    tiktok: "https://www.tiktok.com/@dr..edson.maltez?_r=1&_t=ZS-94J2UOV6ho8",
    facebook: "https://www.facebook.com/share/18Evchghd7/?mibextid=wwXIfr"
  };

  return (
    <footer className="bg-[#0B1A33] text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="container-custom px-4 md:px-6 lg:px-8 py-10 lg:py-12 xl:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
          
          {/* Coluna 1 - Sobre */}
          <div className="space-y-2 lg:space-y-3 text-center sm:text-left">
            <div className="space-y-1">
              <h3 className="text-lg lg:text-xl xl:text-2xl font-serif font-bold text-white tracking-tight">
                {siteName}
              </h3>
              <p className="text-[10px] lg:text-xs text-white/60 font-light">
                {oab}
              </p>
            </div>
            
            <p className="text-white/70 text-xs lg:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Excelência e compromisso com seus direitos há mais de 12 anos. 
              Atuação nas áreas Cívil, Imobiliário, Trabalhista e Criminal.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 lg:pt-2">
              <div className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 bg-white/5 rounded-full flex items-center justify-center">
                <span className="text-accent text-sm lg:text-base">⚖️</span>
              </div>
              <div className="text-left">
                <p className="text-[8px] lg:text-[10px] text-white/40">Confiança e</p>
                <p className="text-[10px] lg:text-xs text-white/80">Tradição desde 2014</p>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="space-y-2 lg:space-y-3 text-center sm:text-left">
            <h4 className="text-[10px] lg:text-xs font-semibold text-accent tracking-[0.2em] uppercase">
              Navegação
            </h4>
            <ul className="space-y-1 lg:space-y-2">
              {[
                { name: 'Início', path: '/' },
                { name: 'Artigos', path: '/blog' },
                { name: 'Sobre', path: '/sobre' },
                { name: 'Contato', path: '/contato' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center justify-center sm:justify-start gap-2 text-white/70 hover:text-accent transition-colors"
                  >
                    <span className="w-0.5 h-0.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="text-xs lg:text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-1 lg:pt-2 space-y-1">
              <a href="#" className="block text-[8px] lg:text-[10px] text-white/40 hover:text-white/60 transition">
                Política de Privacidade
              </a>
              <a href="#" className="block text-[8px] lg:text-[10px] text-white/40 hover:text-white/60 transition">
                Termos de Uso
              </a>
            </div>
          </div>

          {/* Coluna 3 - Contato */}
          <div className="space-y-2 lg:space-y-3 text-center sm:text-left">
            <h4 className="text-[10px] lg:text-xs font-semibold text-accent tracking-[0.2em] uppercase">
              Contato
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent text-sm lg:text-base mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[8px] lg:text-[10px] text-white/40 mb-0.5">Endereço</p>
                  <p className="text-white/80 text-xs lg:text-sm leading-relaxed">
                    {address}
                  </p>
                </div>
              </li>
              
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-2">
                <FontAwesomeIcon icon={faPhoneAlt} className="text-accent text-sm lg:text-base mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[8px] lg:text-[10px] text-white/40 mb-0.5">Telefone / WhatsApp</p>
                  <a
                    href={`tel:${phone}`}
                    className="text-white/80 text-xs lg:text-sm hover:text-accent transition block"
                  >
                    {phone}
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 text-xs lg:text-sm hover:text-accent transition block mt-0.5 inline-flex items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-accent text-[10px] lg:text-xs" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </li>
              
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-accent text-sm lg:text-base mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[8px] lg:text-[10px] text-white/40 mb-0.5">E-mail</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-white/80 text-xs lg:text-sm hover:text-accent transition break-all"
                  >
                    {email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Horário e Redes Sociais */}
          <div className="space-y-2 lg:space-y-3 text-center sm:text-left">
            <h4 className="text-[10px] lg:text-xs font-semibold text-accent tracking-[0.2em] uppercase">
              Atendimento
            </h4>
            <div className="space-y-1 max-w-[180px] mx-auto sm:mx-0">
              <div className="flex justify-between sm:justify-start sm:gap-6 text-xs lg:text-sm text-white/80">
                <span>Seg a Sex</span>
                <span className="text-white/60">9h às 17h</span>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-6 text-xs lg:text-sm text-white/80">
                <span>Sáb/Dom</span>
                <span className="text-white/60">Fechado</span>
              </div>
            </div>

            <div className="pt-2 lg:pt-3">
              <h5 className="text-[8px] lg:text-[10px] text-white/40 mb-1 lg:mb-2 tracking-wider">SIGA-NOS</h5>
              <div className="flex justify-center sm:justify-start gap-1 lg:gap-2">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                  }}
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-xs lg:text-sm" />
                </a>

                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: '#000000' }}
                  aria-label="TikTok"
                >
                  <FontAwesomeIcon icon={faTiktok} className="text-xs lg:text-sm" />
                </a>

                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: '#1877f2' }}
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-xs lg:text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom px-4 md:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1 lg:gap-2">
            <p className="text-[8px] lg:text-[10px] text-white/40 text-center sm:text-left">
              © {currentYear} {siteName}. Todos os direitos reservados.
            </p>
            <p className="text-[6px] lg:text-[8px] text-white/20">
              OAB/SP {oab.replace('OAB/SP ', '')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}