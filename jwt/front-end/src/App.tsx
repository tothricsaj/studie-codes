import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState(null);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/content')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('data', data);
        
        setContent(data.content);
      })
      .catch(e => console.log(e)
      )
      .finally(() => {
        setFetchError('Content not Fetched')
      })
  });

  return (
    <div className="App">
      <p>
        { (content || fetchError) }
      </p>
    </div>
  );
}

export default App;
