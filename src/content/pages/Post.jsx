import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    siteName: 'Dr. Carlos Silva',
    oab: 'OAB/SP 123.456',
    whatsapp: '5511999999999'
  });

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        setContent((prev) => ({ ...prev, ...settingsData?.data }));

        const response = await fetch(`/content/posts/${slug}.md`);

        if (response.ok) {
          const text = await response.text();
          const { data, content } = parseFrontmatter(text);
          setPost({ slug, data, content });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  function parseFrontmatter(text) {
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { data: {}, content: text };

    const data = {};
    match[1].split('\n').forEach((line) => {
      if (line.includes(': ')) {
        const [key, ...value] = line.split(': ');
        data[key.trim()] = value.join(': ').trim();
      }
    });

    return { data, content: match[2] };
  }

  function renderMarkdown(content) {
    if (!content) return '';
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    return marked.parse(content);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-secondary flex items-center justify-center">
        <div className="relative">
          {/* Anel de carregamento com efeito glow */}
          <div className="w-24 h-24 rounded-full border-4 border-accent/20 border-t-accent animate-spin"></div>
          
          {/* Partículas decorativas */}
          <div className="absolute inset-0 -z-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-accent/30 rounded-full animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white/80 font-light tracking-widest uppercase text-sm">
            Carregando artigo
          </p>
          <div className="flex gap-1 justify-center mt-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-secondary flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          {/* Ilustração SVG estilizada */}
          <div className="relative mb-8">
            <div className="w-40 h-40 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <svg className="w-20 h-20 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" 
                />
              </svg>
            </div>
            
            {/* Círculos decorativos */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary-light">
              Ops! 404
            </span>
          </h1>
          
          <p className="text-xl text-white/70 mb-8">
            O artigo que você procura não foi encontrado ou foi removido.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="group relative px-8 py-4 bg-accent text-primary font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Ver todos os artigos
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            <Link
              to="/"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />

      {/* Hero Section com imagem ou gradiente */}
      <div className="relative">
        {post.data.image ? (
          <>
            <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
              {/* Imagem com overlay gradiente */}
              <img
                src={post.data.image}
                alt={post.data.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[10s]"
              />
              
              {/* Overlay com múltiplas camadas */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
              
              {/* Efeito de ruído sutil */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" 
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }}
              />
            </div>

            {/* Conteúdo sobreposto à imagem */}
            <div className="absolute inset-0 flex items-end">
              <div className="container-custom w-full pb-20">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-all group bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-sm font-medium">Voltar para artigos</span>
                </Link>

                <div className="max-w-4xl space-y-4">
                  {/* Categoria com badge */}
                  {post.data.category && (
                    <span className="inline-block px-4 py-2 bg-accent text-primary text-sm font-semibold rounded-full">
                      {post.data.category}
                    </span>
                  )}

                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                    {post.data.title}
                  </h1>

                  {/* Meta informações */}
                  <div className="flex flex-wrap items-center gap-6 text-white/80">
                    {post.data.date && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(post.data.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{post.data.author || content.siteName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{Math.ceil(post.content.split(' ').length / 200)} min de leitura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Hero sem imagem
          <section className="pt-40 pb-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="container-custom relative z-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-all group bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Voltar para artigos</span>
              </Link>

              {post.data.category && (
                <span className="inline-block px-4 py-2 bg-accent text-primary text-sm font-semibold rounded-full mb-6">
                  {post.data.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-5xl">
                {post.data.title}
              </h1>
            </div>
          </section>
        )}
      </div>

      {/* Conteúdo principal */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Descrição/Resumo */}
            {post.data.description && (
              <div className="relative mb-12">
                <div className="absolute -left-4 top-0 w-1 h-full bg-accent rounded-full"></div>
                <div className="pl-8 text-xl text-gray-600 italic leading-relaxed border-l border-gray-200">
                  {post.data.description}
                </div>
              </div>
            )}

            {/* Artigo com estilização melhorada */}
            <article
              className="prose prose-lg md:prose-xl max-w-none
                prose-headings:font-bold prose-headings:text-primary
                prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mt-12 prose-h1:mb-6
                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-accent hover:prose-a:text-primary prose-a:transition-colors prose-a:no-underline hover:prose-a:underline
                prose-strong:text-primary prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                prose-li:text-gray-600 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-gray-50 
                prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                prose-blockquote:not-italic prose-blockquote:text-gray-700
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12
                prose-hr:border-gray-200 prose-hr:my-12"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Separador decorativo */}
            <div className="relative my-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-400">✦ ✦ ✦</span>
              </div>
            </div>

            {/* Rodapé do artigo */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Todos os artigos</span>
              </Link>

              {/* Compartilhamento */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Compartilhar:</span>
                <button 
                  onClick={() => window.navigator.share?.({ 
                    title: post.data.title,
                    url: window.location.href 
                  })}
                  className="p-2 text-gray-400 hover:text-accent transition-colors rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sugestões de posts relacionados (pode ser implementado depois) */}
      {/* <RelatedPosts currentSlug={slug} category={post.data.category} /> */}

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