import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async (journalistId = '') => {
    let url = 'http://localhost:5000/articles';
    if (journalistId) {
      url = `http://localhost:5000/journalists/${journalistId}/articles`;
    }
    axios.get(url)
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  };

  const fetchJournalists = async () => {
    axios.get('http://localhost:5000/journalists')
      .then(res => setJournalists(res.data))
      .catch(err => console.error(err));
  };

  const applyFilters = () => {
    fetchArticles(selectedJournalist);
  };

  const resetFilters = () => {
    setSelectedJournalist('');
    fetchArticles('');
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" value={selectedJournalist} onChange={(e) => setSelectedJournalist(e.target.value)}>
          <option value="">All Journalists</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong>
            <div>By Journalist #{article.journalistId} | Category #{article.categoryId}</div>
            <button disabled>Delete</button> <button disabled>Update</button> <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}