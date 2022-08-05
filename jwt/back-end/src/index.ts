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
 
app.get('/', (_req, _res) => {
  _res.send("TypeScript With Expresss");
});
 
app.listen(port, () => {
  console.log(`TypeScript with Express
    http://localhost:${port}/`);
});