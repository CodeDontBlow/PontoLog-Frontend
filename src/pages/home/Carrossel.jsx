import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css';

const Carrossel = () => {
  const query = `"economia" OR "geopolítica" OR "exportações" OR "importações"`;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'f91b94e7398049eaafdeb5644274dd0c';

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar notícias:', error);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <p>Carregando notícias...</p>;

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Slider {...settings}>
        {news
          .filter(article => article.urlToImage && article.title && article.description)
          .map((article, index) => (
            <div key={index}>
              <div className={styles.noticiaCard}>
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className={styles.noticiaImagem}
                />
                <div className={styles.noticiaConteudo}>
                  <h3>{article.title}</h3>
                  <p>
                    {article.description.length > 200
                      ? article.description.slice(0, 200) + '...'
                      : article.description}
                  </p>
                  <div className={styles.noticiaRodape}>
                    <p className={styles.noticiaData}>
                      {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.noticiaLink}
                    >
                      Leia mais
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carrossel;
