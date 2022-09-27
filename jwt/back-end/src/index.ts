import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
 
const app: express.Application = express();
 
const port: number = 5000;

const users = [
  {
    username: 'Jon Doe',
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
 
app.get('/', (_req, _res) => {
  _res.send("TypeScript With Expresss");
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