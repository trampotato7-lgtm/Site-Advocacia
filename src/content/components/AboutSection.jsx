export default function AboutSection({ lawyerName, lawyerBio, lawyerPhoto, experience, cases, specializations }) {
  return (
    <section className="py-12 lg:py-14 xl:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-center">
          
          {/* Image Gallery */}
          <div className="relative max-w-md mx-auto lg:mx-0 w-full">
            <div className="relative z-10 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-xl xl:shadow-2xl group">
              <img
                src={lawyerPhoto}
                alt={lawyerName}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-4 lg:-bottom-5 xl:-bottom-6 -right-3 lg:-right-4 xl:-right-5 bg-white p-2 lg:p-3 xl:p-4 rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl xl:shadow-2xl z-20 animate-float">
              <p className="text-lg lg:text-xl xl:text-2xl font-bold text-primary">{experience}+</p>
              <p className="text-[8px] lg:text-[10px] xl:text-xs text-gray-600 whitespace-nowrap">Anos de experiência</p>
            </div>
            
            <div className="absolute -top-4 lg:-top-5 xl:-top-6 -left-3 lg:-left-4 xl:-left-5 bg-white p-2 lg:p-3 xl:p-4 rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl xl:shadow-2xl z-20 animate-float" style={{ animationDelay: '1s' }}>
              <p className="text-lg lg:text-xl xl:text-2xl font-bold text-primary">{cases}+</p>
              <p className="text-[8px] lg:text-[10px] xl:text-xs text-gray-600 whitespace-nowrap">Casos bem-sucedidos</p>
            </div>

            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl lg:rounded-2xl blur-lg lg:blur-xl xl:blur-2xl transform rotate-2 lg:rotate-3"></div>
          </div>

          {/* Content */}
          <div className="space-y-3 lg:space-y-4 xl:space-y-5 text-center lg:text-left">
            <div>
              <span className="text-accent font-semibold tracking-wider uppercase text-[10px] lg:text-xs inline-block mb-1 lg:mb-2">
                Sobre o advogado
              </span>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary leading-tight">
                {lawyerName}
              </h2>
            </div>

            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
              {lawyerBio}
            </p>

            {/* Specializations Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3 pt-3 lg:pt-4">
              {(specializations || [
                { icon: "⚖️", title: "Direito Civil" },
                { icon: "📄", title: "Direito Trabalhista" },
                { icon: "🔒", title: "Direito Criminal" },
                { icon: "🏛️", title: "Direito Empresarial" },
                { icon: "🏠", title: "Direito Imobiliário" }
              ]).map((spec, index) => (
                <div
                  key={index}
                  className="bg-white p-2 lg:p-3 rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100 group"
                >
                  <span className="text-xl lg:text-2xl mb-0.5 lg:mb-1 block group-hover:scale-110 transition-transform">
                    {spec.icon}
                  </span>
                  <h3 className="font-semibold text-primary text-[8px] lg:text-[10px] xl:text-xs text-center">
                    {spec.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 lg:gap-3 pt-3 lg:pt-4">
              <div className="flex items-center justify-center sm:justify-start gap-1 lg:gap-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-[10px] lg:text-xs">OAB/SP 344.956</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 lg:gap-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-[10px] lg:text-xs">Membro da OAB desde 2014</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}