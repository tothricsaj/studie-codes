import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
 
import bodyParser from 'body-parser';

import jwt from 'jsonwebtoken';

const app: express.Application = express();
 
const port: number = 5000;

const users = [
  {
    id: 1,
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

  const foundUser = users.filter(user => user.userName === userName)[0];

  if(!foundUser) {
    const error = new Error('User not found!');
    throw error;
  }

  if(password !== foundUser.password) {
    throw new Error('Wrong password!');
  }

  const token = jwt.sign(
    {
      userId: foundUser.id,
      userName: foundUser.userName
    },
    'somesupersecretsecret',
    {expiresIn: '1h'}
  );

  _res.status(200).json({
    token: token,
    userName: foundUser.userName
  });
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