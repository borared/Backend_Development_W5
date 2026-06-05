import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async (journalistId = '', categoryId = '') => {
    let url = 'http://localhost:5000/articles';
    const params = new URLSearchParams();
    if (journalistId) params.append('journalistId', journalistId);
    if (categoryId) params.append('categoryId', categoryId);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
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

  const fetchCategories = async () => {
    axios.get('http://localhost:5000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }

  const applyFilters = () => {
    fetchArticles(selectedJournalist, selectedCategory);
  };

  const resetFilters = () => {
    setSelectedJournalist('');
    setSelectedCategory('');
    fetchArticles('', '');
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

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
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