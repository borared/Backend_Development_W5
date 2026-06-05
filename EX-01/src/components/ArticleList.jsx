import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Q1 – Fetch articles from the API
    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  };

  const deleteArticle = async (id) => {
    // Delete an article by ID
    axios.delete(`http://localhost:5000/articles/${id}`)
      .then(() => fetchArticles())
      .catch(err => console.error(err));
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => {
              // Navigate to update article form with article ID
              navigate(`/update/${article.id}`);
            }}>Update</button>
            <button onClick={() => {
              // Navigate to view article details with article ID
              navigate(`/articles/${article.id}`);
            }}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}