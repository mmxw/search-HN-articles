import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";




function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=hooks"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div className="container">
      <h1>Search for HackerNews articles!</h1>
      <form
        className="searchbox"
        onSubmit={(e) => {
          e.preventDefault();
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="hooks"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <div className="result-container">
        {loading ? (
          <div>loading...</div>
        ) : (
          <ul>
            {data.hits.map((item) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    
  );
}

export default App;
