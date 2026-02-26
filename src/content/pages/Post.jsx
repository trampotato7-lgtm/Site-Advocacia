import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

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

  function renderMarkdown(content) {
    if (!content) return '';
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    return marked.parse(content);
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Animação de carregamento mais elegante */}
            <div className="absolute inset-0 border-2 border-gold-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl text-gold-500 animate-pulse">⚖️</span>
            </div>
          </div>
          
          {/* Texto de carregamento mais sofisticado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gold-500 font-light tracking-[0.3em] uppercase text-sm mb-4">
              Carregando Artigo
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
        
        {/* Hero section do erro */}
        <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative container-custom py-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              {/* Ícone */}
              <div className="inline-block p-6 bg-white/5 backdrop-blur-sm rounded-full border border-gold-500/30 mb-8">
                <span className="text-7xl text-gold-500">📜</span>
              </div>
              
              {/* Título */}
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                Artigo não encontrado
              </h1>
              
              {/* Linha decorativa */}
              <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
              
              {/* Texto */}
              <p className="text-xl text-gray-300 mb-12 font-light leading-relaxed">
                O artigo que você procura pode ter sido removido ou ainda não foi publicado.
                Navegue por outros conteúdos em nosso blog.
              </p>

              {/* Botão */}
              <Link
                to="/blog"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gold-500 text-navy-900 font-semibold text-lg hover:bg-gold-400 transition-all shadow-2xl hover:shadow-gold-500/30"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Voltar para o Blog
              </Link>
            </motion.div>
          </div>
        </section>
        
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      {/* HEADER */}
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
      
      {/* HERO SECTION DO POST - NOVO DESIGN */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
        </div>
        
        {/* Padrão de grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, gold 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative container-custom py-32">
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 text-gold-400 hover:text-gold-300 transition-colors group text-sm uppercase tracking-wider font-medium"
            >
              <span className="w-8 h-px bg-gold-500/50 group-hover:w-12 transition-all"></span>
              <span className="group-hover:translate-x-1 transition-transform">← Voltar para artigos</span>
            </Link>
          </motion.div>

          {/* Conteúdo do hero */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Categoria */}
            {post.data.category && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="inline-block px-6 py-2 bg-gold-500/10 text-gold-400 text-sm font-bold tracking-[0.2em] uppercase rounded-full border border-gold-500/30">
                  {post.data.category}
                </span>
              </motion.div>
            )}

            {/* Título */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight"
            >
              {post.data.title}
            </motion.h1>

            {/* Descrição */}
            {post.data.description && (
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-300 mb-12 font-light leading-relaxed max-w-3xl"
              >
                {post.data.description}
              </motion.p>
            )}

            {/* Metadados */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-8 text-gray-300"
            >
              {post.data.date && (
                <div className="flex items-center gap-3">
                  <span className="text-gold-400">📅</span>
                  <time className="font-light">
                    {new Date(post.data.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              )}
              
              <div className="w-px h-6 bg-gray-600"></div>
              
              <div className="flex items-center gap-3">
                <span className="text-gold-400">⚖️</span>
                <span className="font-light">{post.data.author || `Dr. ${content.siteName}`}</span>
              </div>
              
              <div className="w-px h-6 bg-gray-600"></div>
              
              <div className="flex items-center gap-3">
                <span className="text-gold-400">📋</span>
                <span className="font-light">{content.oab}</span>
              </div>
            </motion.div>

            {/* Tempo de leitura */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12"
            >
              <span className="inline-flex items-center gap-2 text-sm text-gold-400 bg-gold-500/10 px-6 py-3 rounded-full border border-gold-500/30">
                ⏱️ {Math.ceil(post.content.split(' ').length / 200)} MINUTOS DE LEITURA
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Curva decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 100L1440 0V100H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="container-custom max-w-4xl py-20">
        {/* Imagem de destaque */}
        {post.data.image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20 -mt-32 relative z-10"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.data.image}
                alt={post.data.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        )}

        {/* Artigo com tipografia refinada */}
        <motion.article
          variants={fadeInUp}
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-navy-900 prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mt-20 prose-h1:mb-10 prose-h1:text-center
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-navy-100
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-navy-800
            prose-p:text-navy-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:font-light
            prose-p:first-letter:text-4xl prose-p:first-letter:text-gold-600 prose-p:first-letter:font-serif
            prose-p:first-letter:mr-2 prose-p:first-letter:float-left
            prose-a:text-gold-600 hover:prose-a:text-gold-500 prose-a:no-underline hover:prose-a:underline prose-a:transition-all prose-a:font-medium
            prose-strong:text-navy-900 prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-8 prose-ul:my-10
            prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-10
            prose-li:text-navy-700 prose-li:marker:text-gold-500 prose-li:text-lg prose-li:mb-3 prose-li:font-light
            prose-blockquote:border-l-4 prose-blockquote:border-gold-500 prose-blockquote:bg-navy-50 
            prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl
            prose-blockquote:not-italic prose-blockquote:text-navy-700 prose-blockquote:font-serif prose-blockquote:text-xl
            prose-blockquote:my-12 prose-blockquote:ml-0
            prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-16
            prose-hr:border-navy-100 prose-hr:my-20"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* SEÇÃO DO AUTOR */}
        <motion.div 
          variants={fadeInUp}
          className="mt-20 p-12 bg-gradient-to-br from-navy-50 to-white rounded-3xl border border-navy-100"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar/A selo */}
            <div className="w-32 h-32 bg-navy-900 rounded-2xl flex items-center justify-center border-4 border-gold-500/30">
              <span className="text-5xl text-gold-500">⚖️</span>
            </div>
            
            {/* Informações do autor */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif text-2xl text-navy-900 mb-2">{content.siteName}</h3>
              <p className="text-gold-600 mb-3 font-medium">{content.oab}</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Especialista dedicado a oferecer soluções jurídicas com excelência, 
                ética e compromisso. Artigos elaborados para informar e orientar sobre 
                temas relevantes do direito.
              </p>
            </div>
            
            {/* Data de publicação */}
            {post.data.date && (
              <div className="text-right">
                <div className="bg-navy-900 text-white px-6 py-3 rounded-xl">
                  <p className="text-xs text-gold-400 mb-1">Publicado em</p>
                  <p className="font-serif">
                    {new Date(post.data.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* NAVEGAÇÃO */}
        <motion.div 
          variants={fadeInUp}
          className="mt-16 pt-12 border-t border-navy-100 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <Link
            to="/blog"
            className="group inline-flex items-center gap-3 text-navy-600 hover:text-gold-600 transition-colors"
          >
            <span className="w-8 h-px bg-gold-500/50 group-hover:w-12 transition-all"></span>
            <span className="font-medium group-hover:translate-x-1 transition-transform">← Todos os artigos</span>
          </Link>

          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.data.title,
                  text: post.data.description,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copiado para a área de transferência!');
              }
            }}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-navy-50 hover:bg-gold-50 rounded-xl text-navy-600 hover:text-gold-600 transition-all border border-navy-200 hover:border-gold-500"
          >
            <span className="font-medium">Compartilhar artigo</span>
            <span className="group-hover:translate-x-1 transition-transform">📤</span>
          </button>
        </motion.div>
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
    </motion.div>
  );
}