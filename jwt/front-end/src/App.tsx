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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValues)
      });

      const data = await res.json();

      if(res.status === 401) {
        setMessage(data.message);
      }

      if(res.status === 200) {
        setIsAuth(true);
        setToken(data.token);
        setUserName(data.userName);
        setMessage(data.message);

        localStorage.setItem('token', data.token);
      }
    } catch(e) {
      console.log(e);
    }
  }

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
