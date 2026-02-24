import { useParams } from 'react-router-dom';

export default function Post() {
  const { slug } = useParams();
  
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>TESTE DE POST</h1>
      <p>Slug: {slug}</p>
      <p>Se você está vendo isso, a rota está funcionando!</p>
    </div>
  );
}