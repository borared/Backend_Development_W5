import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async (categoryId = '') => {
    let url = 'http://localhost:5000/articles';
    if (categoryId) {
      url = `http://localhost:5000/categories/${categoryId}/articles`;
    }
    axios.get(url)
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  };

  const fetchCategories = async () => {
    axios.get('http://localhost:5000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }

  const applyFilters = () => {
    fetchArticles(selectedCategory);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    fetchArticles('');
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
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