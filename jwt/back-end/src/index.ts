import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
 
import bodyParser from 'body-parser';

const app: express.Application = express();
 
const port: number = 5000;

const users = [
  {
    userName: 'Jon Doe',
    password: '1234'
  }
];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
 
app.get('/', (_req, _res) => {
  _res.send("TypeScript With Expresss");
});

app.post('/login', (_req, _res) => {
  const userName = _req.body.userName;
  const password = _req.body.password;

  const foundUser = users.filter(user => user.userName === userName);

  _res.json(foundUser);
});


app.get('/content', (_req, _res) => {
  _res.json({
    content: 'you can read the content!'
  });
});
 
app.listen(port, () => {
  console.log(`TypeScript with Express
    http://localhost:${port}/`);
});