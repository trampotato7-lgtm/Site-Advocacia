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
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <div className="text-center">
          {/* Loader com estilo de papel */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-2 border-primary/10 rounded-sm rotate-45"></div>
            <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-sm rotate-45 animate-spin"></div>
          </div>
          <p className="text-primary/60 font-serif italic text-lg">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <span className="text-8xl font-serif text-primary/20">404</span>
          </div>
          <h1 className="text-3xl font-serif text-primary mb-4">Artigo não encontrado</h1>
          <p className="text-gray-600 mb-8 font-light">
            O artigo que você procura pode ter sido removido ou ainda não foi publicado.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-paper-50 font-serif text-lg rounded-sm hover:bg-primary-dark transition-all border border-primary/20 shadow-sm hover:shadow-md"
          >
            ← Voltar para o blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50 font-serif antialiased">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />

      {/* Espaçamento elegante após o header */}
      <div className="h-12"></div>

      {/* Conteúdo principal - estilo carta/papel */}
      <main className="container-custom max-w-4xl">
        {/* Artigo emoldurado como papel */}
        <div className="bg-paper-100 rounded-sm shadow-xl border border-paper-200 relative">
          {/* Efeito de textura de papel */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply'
            }}
          ></div>

          {/* Conteúdo do artigo */}
          <div className="relative px-8 md:px-16 py-12 md:py-16">
            {/* Linha decorativa superior - como papel timbrado */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            {/* Cabeçalho do artigo - estilo carta formal */}
            <div className="mb-12 text-center">
              {/* Breadcrumb sutil */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors mb-6 font-sans tracking-wide"
              >
                ← Todos os artigos
              </Link>

              {/* Categoria como selo */}
              {post.data.category && (
                <div className="mb-6">
                  <span className="inline-block px-4 py-1 border border-primary/30 text-primary text-xs tracking-wider uppercase">
                    {post.data.category}
                  </span>
                </div>
              )}

              {/* Título com estilo de cabeçalho de carta */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
                {post.data.title}
              </h1>

              {/* Assinatura/data - como carta formal */}
              <div className="flex flex-col items-center gap-3 text-gray-500 border-b border-paper-300 pb-8">
                <div className="flex items-center gap-4">
                  {post.data.date && (
                    <time className="text-sm font-light tracking-wide">
                      {new Date(post.data.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  )}
                  <span className="text-primary/30">•</span>
                  <span className="text-sm font-light">
                        Por <span className="font-medium">{post.data.author || `Dr. ${content.siteName}`}</span>
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-sans">{content.oab}</span>
              </div>
            </div>

            {/* Imagem de destaque (se houver) - como ilustração de carta */}
            {post.data.image && (
              <div className="mb-12 -mx-4 md:-mx-8">
                <div className="relative h-[400px] overflow-hidden rounded-sm shadow-md">
                  <img
                    src={post.data.image}
                    alt={post.data.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                {post.data.imageCaption && (
                  <p className="text-sm text-gray-400 text-center mt-3 font-sans italic">
                    {post.data.imageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Descrição/Resumo - como destaque em carta */}
            {post.data.description && (
              <div className="mb-12 p-8 bg-paper-50 border-l-4 border-primary rounded-r-sm italic text-gray-700 text-lg leading-relaxed">
                "{post.data.description}"
              </div>
            )}

            {/* Artigo com tipografia de carta/papel */}
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-primary prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:text-center
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-paper-300
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-justify
                prose-a:text-primary hover:prose-a:text-primary-dark prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-8 prose-ul:my-8 prose-ul:space-y-3
                prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-8 prose-ol:space-y-3
                prose-li:text-gray-700 prose-li:marker:text-primary/60
                prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:bg-paper-50 
                prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-sm
                prose-blockquote:not-italic prose-blockquote:text-gray-600 prose-blockquote:font-serif
                prose-img:rounded-sm prose-img:shadow-lg prose-img:my-12 prose-img:border prose-img:border-paper-300
                prose-hr:border-paper-300 prose-hr:my-16"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Tempo de leitura - discreto */}
            <div className="mt-12 text-center">
              <span className="text-xs text-gray-400 font-sans tracking-wider">
                • {Math.ceil(post.content.split(' ').length / 200)} min de leitura •
              </span>
            </div>

            {/* Espaço para assinatura digital */}
            <div className="mt-16 pt-8 border-t border-paper-300">
              <div className="flex flex-col items-center text-center">
                {/* Selo/Assinatura */}
                <div className="mb-6">
                  <svg className="w-16 h-16 text-primary/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="50" cy="50" r="45" strokeDasharray="4 4"/>
                    <path d="M30 50 L45 65 L70 35" strokeWidth="2"/>
                  </svg>
                </div>
                
                <p className="font-serif text-primary mb-2">{content.siteName}</p>
                <p className="text-sm text-gray-400 mb-4">{content.oab}</p>
                
                {/* Data por extenso novamente */}
                {post.data.date && (
                  <p className="text-xs text-gray-400 font-sans">
                    {new Date(post.data.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Navegação */}
            <div className="mt-12 pt-8 border-t border-paper-300 flex justify-between items-center">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors font-sans tracking-wide"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Ver todos os artigos
              </Link>

              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.data.title,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    // Feedback visual sutil
                    const btn = document.getElementById('shareBtn');
                    btn.innerHTML = '✓ Link copiado';
                    setTimeout(() => {
                      btn.innerHTML = 'Compartilhar';
                    }, 2000);
                  }
                }}
                id="shareBtn"
                className="text-sm text-gray-400 hover:text-primary transition-colors font-sans tracking-wide"
              >
                Compartilhar
              </button>
            </div>
          </div>
        </div>

        {/* Espaço após o artigo */}
        <div className="h-16"></div>
      </main>

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