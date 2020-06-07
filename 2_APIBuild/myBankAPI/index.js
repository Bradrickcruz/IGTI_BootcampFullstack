// o arquivo "nodemon.json" Ignora arquivos para reiniciar o nodemon
import express from 'express';
import { promises as fs } from 'fs';
import accountRouter from './routes/account.js';

// const express = require('express');
// const fs = require('fs');

const app = express();
const port = 3000;

global.jsonAccounts = './accounts.json'; // global pode ser acessado de qualquer JS do projeto

app.use(express.json()); // permite receber requisições com JSON
app.use('/account', accountRouter);

app.listen(port, async () => {
  try {
    await fs.readFile(jsonAccounts, 'UTF-8', () => {});
    console.log('API ativa.');
  } catch (err) {
    const initialJSON = { nextID: 1, accounts: [] };
    await fs.writeFile(jsonAccounts, JSON.stringify(initialJSON), (err) => {
      return { err: err.message };
    });
  }
});
