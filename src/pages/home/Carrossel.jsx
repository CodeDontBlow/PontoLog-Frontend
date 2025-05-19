import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css';
import './Carrossel.css'



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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (loading) return <p>Carregando notícias...</p>;

  return (
    <div className="news-carousel">
      <h2>Últimas Notícias</h2>
      <Slider {...settings}>
        {news.map((article, index) => (
          <div key={index} className="news-slide">
            <img src={article.urlToImage} alt={article.title} className="news-image" />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Leia mais</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrossel;