import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState({userName: '', password: ''});
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
  const [message, setMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState();
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
      if(res.status === 401) {
        setMessage('Validation error!');
      }

      return res.json()
    })
    .then((data: any) => {
      setIsAuth(true);
      setToken(data.token);
      setUserName(data.userName);
      setMessage(data.message);

      console.log('data.userName ->  ', data.userName);
      

      localStorage.setItem('token', data.token);
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
        {
          message
          ? <p className="message">{message}</p>
          : null
        }

        {
          isAuth
          ? <>
              <h2>{userName}</h2>
              <form>
                <input type="submit" value="Signout" />
              </form>
            </>
          :<form onSubmit={handleSubmit}>
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
        }

      </div>
    </div>
  );
}

export default App;
