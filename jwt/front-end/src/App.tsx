import React, { useState, useEffect } from 'react';
import './App.css';

import Content from './components/Content/Content';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState();
	const [content, setContent] = useState<string>('Pleas login to see content!');
  const [inputValues, setInputValues] = useState({
    userName: '',
    password: ''
  });


	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('http://localhost:5000/content', {
					headers: {
						Authorization: 'Bearer ' + token
					}
				});
				const fetchedContent = await res.json();

				setContent(fetchedContent.content);
			} catch(e) {
				console.log(e);
			}
		}

		fetchData();
	}, [content]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [token]);

  const handleInputChanges = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  }

  const loginHandle = async (e: React.SyntheticEvent) => {
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

        setInputValues({
          userName: '',
          password: ''
        });
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

  const logoutHandle = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsAuth(false);
    setInputValues({
      userName: '',
      password: ''
    }); 
    setMessage(null);

    localStorage.removeItem('token');
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
              <form onSubmit={logoutHandle}>
                <input type="submit" value="Signout" />
              </form>
            </>
          :<form onSubmit={loginHandle}>
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
      <Content token={token} content={content} />
    </div>
  );
}

export default App;
