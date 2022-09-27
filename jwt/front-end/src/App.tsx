import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [inputValues, setInputValues] = useState({
    userName: '',
    password: ''
  });

  const handleInputChanges = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputValues);
  }

  // useEffect(() => {
  //   fetch('http://localhost:5000/content')
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       console.log('data', data);
        
  //       setContent(data.content);
  //     })
  //     .catch(e => console.log(e)
  //     )
  //     .finally(() => {
  //       setFetchError('Content not Fetched')
  //     })
  // });

  return (
    <div className="App">
      <div className="App-header">

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={inputValues.userName}
            onChange={handleInputChanges}
          />
          <input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChanges}
          />

          <input type="submit" value="Login" />
        </form>
        {
          isAuth
            ? <p>{content}</p>
            : <p>Please login!</p>
        }

      </div>
    </div>
  );
}

export default App;
