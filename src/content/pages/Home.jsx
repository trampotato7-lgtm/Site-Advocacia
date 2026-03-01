import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { loadContent } from "/src/utils/contentLoader";
import '../styles/animations.css';

export default function Home() {
  const [content, setContent] = useState({
    siteName: "Edson Silva Maltez",
    oab: "OAB/SP 344.956",
    phone: "(19) 99631-9810",
    whatsapp: "5519996319810",
    email: "dredsonmaltez@gmail.com",
    address: "Rua Francisco Biancalana, 31 - sala 02 - Vila Santana, Sumaré - SP",
    instagram: "#",
    linkedin: "#",
    facebook: "#",
    heroTitle: "Excelência e Compromisso em Direito",
    heroSubtitle: "Há mais de 12 anos defendendo seus direitos com ética, dedicação e soluções jurídicas eficientes.",
    heroImage: "",
    lawyerName: "Edson Silva Maltez",
    lawyerBio: "Natural de Diadema, Edson Silva Maltez construiu uma trajetória sólida na advocacia, marcada pela dedicação e pelo compromisso com a justiça. Formado pela PUC Campinas, atua há 12 anos nas áreas de Direito Civil, Trabalhista e Criminal, oferecendo consultoria, assessoria e defesa técnica com ética e atenção personalizada.",
    lawyerPhoto: "/images/advogado/foto-principal.jpg",
    experience: 12,
    cases: 350
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        const homeData = await loadContent('/src/content/pages/home.md');
        
        setContent(prev => ({
          ...prev,
          ...settingsData?.data,
          ...homeData?.data
        }));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="font-sans overflow-x-hidden">
      <Header 
        siteName={content.siteName}
        oab={content.oab}
        whatsapp={content.whatsapp}
      />
      
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        whatsapp={content.whatsapp}
        heroImage={content.heroImage}
      />
      
      <AboutSection
        lawyerName={content.lawyerName}
        lawyerBio={content.lawyerBio}
        lawyerPhoto={content.lawyerPhoto}
        experience={content.experience}
        cases={content.cases}
      />
      
      {/* Seção de Áreas de Atuação */}
      <section className="py-16 lg:py-20 xl:py-24 bg-white">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl lg:max-w-3xl mx-auto mb-10 lg:mb-12 xl:mb-14">
            <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">Nossos serviços</span>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mt-2 mb-2 lg:mb-3">
              Áreas de Atuação
            </h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-xl lg:max-w-2xl mx-auto">
              Atuação estratégica nas principais áreas do direito, com soluções personalizadas 
              para cada caso e compromisso com a excelência jurídica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 xl:gap-6">
            {/* Direito Civil */}
            <div className="group bg-white rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 p-4 lg:p-5 xl:p-6 border border-gray-100">
              <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-3 text-2xl lg:text-3xl text-accent group-hover:scale-110 transition-transform">
                <i className="fas fa-gavel"></i>
              </div>
              <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-primary mb-1 lg:mb-2 group-hover:text-accent transition-colors">Direito Civil</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Assessoria em contratos, responsabilidade civil, indenizações, direitos do consumidor 
                e questões familiares.
              </p>
            </div>

            {/* Direito Criminal */}
            <div className="group bg-white rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 p-4 lg:p-5 xl:p-6 border border-gray-100">
              <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-3 text-2xl lg:text-3xl text-accent group-hover:scale-110 transition-transform">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-primary mb-1 lg:mb-2 group-hover:text-accent transition-colors">Direito Criminal</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Defesa técnica especializada em todas as fases do processo penal, com atuação sigilosa, 
                estratégica e fundamentada.
              </p>
            </div>

            {/* Direito Trabalhista */}
            <div className="group bg-white rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 p-4 lg:p-5 xl:p-6 border border-gray-100">
              <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-3 text-2xl lg:text-3xl text-accent group-hover:scale-110 transition-transform">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-primary mb-1 lg:mb-2 group-hover:text-accent transition-colors">Direito Trabalhista</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Representação de empregados e empregadores em ações trabalhistas, acordos, rescisões 
                e consultoria preventiva.
              </p>
            </div>

            {/* Direito Imobiliário */}
            <div className="group bg-white rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 p-4 lg:p-5 xl:p-6 border border-gray-100">
              <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-3 text-2xl lg:text-3xl text-accent group-hover:scale-110 transition-transform">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-primary mb-1 lg:mb-2 group-hover:text-accent transition-colors">Direito Imobiliário</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Assessoria completa em compra e venda de imóveis, contratos de locação, 
                regularização de propriedades e usucapião.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center">
            <div className="space-y-4 lg:space-y-5 xl:space-y-6">
              <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">Soluções corporativas</span>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary leading-tight">
                Assessoria e consultoria para empresas
              </h2>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Assessoria jurídica estratégica para empresas de todos os portes, com orientação 
                preventiva, análise de riscos e suporte legal completo para decisões seguras 
                e alinhadas à legislação.
              </p>
              <ul className="space-y-2 lg:space-y-3 pt-3 lg:pt-4">
                <li className="flex items-center gap-2 lg:gap-3">
                  <span className="w-4 h-4 lg:w-5 lg:h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-[10px] lg:text-xs"></i>
                  </span>
                  <span className="text-gray-700 text-xs lg:text-sm">Consultoria preventiva e gestão de riscos legais</span>
                </li>
                <li className="flex items-center gap-2 lg:gap-3">
                  <span className="w-4 h-4 lg:w-5 lg:h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-[10px] lg:text-xs"></i>
                  </span>
                  <span className="text-gray-700 text-xs lg:text-sm">Elaboração e revisão de contratos empresariais</span>
                </li>
                <li className="flex items-center gap-2 lg:gap-3">
                  <span className="w-4 h-4 lg:w-5 lg:h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-[10px] lg:text-xs"></i>
                  </span>
                  <span className="text-gray-700 text-xs lg:text-sm">Suporte em negociações e mediação de conflitos</span>
                </li>
                <li className="flex items-center gap-2 lg:gap-3">
                  <span className="w-4 h-4 lg:w-5 lg:h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-[10px] lg:text-xs"></i>
                  </span>
                  <span className="text-gray-700 text-xs lg:text-sm">Acompanhamento em processos administrativos e judiciais</span>
                </li>
              </ul>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 mt-4 lg:mt-5 xl:mt-6 bg-primary text-white px-5 lg:px-6 xl:px-7 py-3 lg:py-3.5 xl:py-4 rounded-full font-semibold text-sm lg:text-base hover:bg-primary/90 transition-all hover:scale-105 shadow-md hover:shadow-lg"
              >
                Solicite uma consultoria
                <i className="fas fa-arrow-right text-accent text-xs lg:text-sm"></i>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-primary text-white p-5 lg:p-6 xl:p-7 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl xl:shadow-2xl animate-float">
                <div className="absolute -top-3 lg:-top-4 -right-3 lg:-right-4 w-16 lg:w-20 xl:w-24 h-16 lg:h-20 xl:h-24 bg-accent/10 rounded-full blur-xl lg:blur-2xl"></div>
                <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-4 lg:mb-5">Diferenciais da nossa assessoria</h3>
                <div className="space-y-4 lg:space-y-5">
                  <div className="flex gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent text-xl lg:text-2xl">
                      <i className="fas fa-bullseye"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm lg:text-base mb-0.5">Estratégia personalizada</h4>
                      <p className="text-white/70 text-xs lg:text-sm">
                        Soluções jurídicas desenhadas especificamente para a realidade do seu negócio.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent text-xl lg:text-2xl">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm lg:text-base mb-0.5">Agilidade e eficiência</h4>
                      <p className="text-white/70 text-xs lg:text-sm">
                        Respostas rápidas e precisas para suas demandas jurídicas.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent text-xl lg:text-2xl">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm lg:text-base mb-0.5">Sigilo e confiança</h4>
                      <p className="text-white/70 text-xs lg:text-sm">
                        Total confidencialidade e compromisso absoluto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 xl:py-24 bg-white">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl lg:max-w-3xl mx-auto mb-10 lg:mb-12 xl:mb-14">
            <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">Metodologia</span>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mt-2 mb-2 lg:mb-3">
              Como Atuamos
            </h2>
            <p className="text-gray-600 text-sm lg:text-base">
              Um processo de trabalho estruturado para oferecer segurança, transparência 
              e resultados efetivos em cada etapa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-5 xl:gap-6">
            <div className="text-center group animate-fadeInUp">
              <div className="w-14 h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 text-xl lg:text-2xl text-accent group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1 lg:mb-2">Consulta inicial</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Análise aprofundada do seu caso e definição da estratégia jurídica mais adequada.
              </p>
            </div>
            <div className="text-center group animate-fadeInUp delay-200">
              <div className="w-14 h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 text-xl lg:text-2xl text-accent group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1 lg:mb-2">Planejamento estratégico</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Desenvolvimento de um plano de ação personalizado com análise de riscos.
              </p>
            </div>
            <div className="text-center group animate-fadeInUp delay-400">
              <div className="w-14 h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 text-xl lg:text-2xl text-accent group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1 lg:mb-2">Acompanhamento contínuo</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Atualização constante sobre o andamento do processo com total transparência.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-center">
            <div>
              <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">Diferenciais</span>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mt-2 mb-4 lg:mb-5 xl:mb-6">
                Por que nos escolher
              </h2>
              
              <div className="space-y-4 lg:space-y-5 xl:space-y-6">
                <div className="flex gap-3 lg:gap-4 animate-slideInLeft">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 text-accent text-lg lg:text-xl xl:text-2xl">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1">Atendimento personalizado</h3>
                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                      Cada cliente é único. Desenvolvemos estratégias sob medida, com atenção individual 
                      e soluções específicas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 lg:gap-4 animate-slideInLeft delay-200">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 text-accent text-lg lg:text-xl xl:text-2xl">
                    <i className="fas fa-scale-balanced"></i>
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1">Experiência e compromisso</h3>
                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                      Mais de 12 anos de atuação nas áreas Cível, Trabalhista e Criminal.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 lg:gap-4 animate-slideInLeft delay-400">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 text-accent text-lg lg:text-xl xl:text-2xl">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1">Acompanhamento transparente</h3>
                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                      Você recebe atualizações claras e periódicas sobre cada etapa do processo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slideInRight">
              <div className="bg-primary text-white p-5 lg:p-6 xl:p-7 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl xl:shadow-2xl">
                <div className="absolute -top-3 lg:-top-4 -left-3 lg:-left-4 w-20 lg:w-24 xl:w-28 h-20 lg:h-24 xl:h-28 bg-accent/10 rounded-full blur-2xl lg:blur-3xl"></div>
                <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-4 lg:mb-5">Compromissos com nossos clientes</h3>
                <ul className="space-y-2 lg:space-y-3">
                  <li className="flex items-center gap-2 lg:gap-3">
                    <span className="text-accent text-xs lg:text-sm"><i className="fas fa-check-circle"></i></span>
                    <span className="text-xs lg:text-sm">Ética e transparência em todas as relações</span>
                  </li>
                  <li className="flex items-center gap-2 lg:gap-3">
                    <span className="text-accent text-xs lg:text-sm"><i className="fas fa-check-circle"></i></span>
                    <span className="text-xs lg:text-sm">Sigilo profissional absoluto</span>
                  </li>
                  <li className="flex items-center gap-2 lg:gap-3">
                    <span className="text-accent text-xs lg:text-sm"><i className="fas fa-check-circle"></i></span>
                    <span className="text-xs lg:text-sm">Atualização constante e excelência técnica</span>
                  </li>
                  <li className="flex items-center gap-2 lg:gap-3">
                    <span className="text-accent text-xs lg:text-sm"><i className="fas fa-check-circle"></i></span>
                    <span className="text-xs lg:text-sm">Comunicação clara e acessível</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA para Contato */}
      <section className="py-14 lg:py-16 xl:py-18 bg-primary text-white">
        <div className="container-custom px-4 md:px-6 lg:px-8 text-center">
          <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 xl:mb-5 animate-fadeInUp">
            Pronto para resolver sua questão jurídica?
          </h3>
          <p className="text-sm lg:text-base xl:text-lg text-white/80 mb-5 lg:mb-6 xl:mb-7 max-w-xl lg:max-w-2xl mx-auto animate-fadeInUp delay-200">
            Entre em contato agora mesmo e agende uma consulta. Estamos prontos para ajudar.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 lg:gap-3 bg-accent text-primary px-6 lg:px-7 xl:px-8 py-3 lg:py-3.5 xl:py-4 rounded-full font-bold text-sm lg:text-base hover:scale-105 transition-all shadow-xl lg:shadow-2xl hover:shadow-accent/30 animate-fadeInUp delay-400 group"
          >
            <span>Falar com o advogado</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-xs lg:text-sm"></i>
          </Link>
        </div>
      </section>
      
      <WhatsAppButton whatsapp={content.whatsapp} />
      
      <Footer
        siteName={content.siteName}
        oab={content.oab}
        phone={content.phone}
        email={content.email}
        address={content.address}
        whatsapp={content.whatsapp}
      />
    </div>
  );
}