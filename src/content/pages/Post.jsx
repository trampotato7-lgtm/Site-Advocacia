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
        if (!response.ok) {
          setPost(null);
          return;
        }

        const text = await response.text();
        const { data, content } = parseFrontmatter(text);
        setPost({ slug, data, content });
      } catch (error) {
        console.error('Erro:', error);
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
    marked.setOptions({ breaks: true, gfm: true });
    return marked.parse(content);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1>Artigo não encontrado</h1>
      </div>
    );
  }

  return (
    <div>
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>{post.data.title}</h1>
        <p><small>{post.data.date}</small></p>
        {post.data.description && <p><em>{post.data.description}</em></p>}
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
        <Link to="/blog">← Voltar</Link>
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