import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState({userName: '', password: ''});
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
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValues)
    }) 
    .then(res => {
      return res.json()
      // console.log('res -> ', res);
      // return {
      //   foo: 'bar'
      // };
    })
    .then((data: any) => {
      console.log('data -> ', data);
      
      setContent(data);
      setIsAuth(true);
    })
    .catch(err => console.log(err)
    )
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
            ? <p>{content.userName}</p>
            : <p>Please login!</p>
        }

      </div>
    </div>
  );
}

export default App;
