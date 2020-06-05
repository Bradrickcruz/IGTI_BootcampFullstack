// o arquivo "nodemon.json" Ignora arquivos para reiniciar o nodemon
import express from 'express';
import fs from 'fs';

// const express = require('express');
// const fs = require('fs');

const app = express();
const port = 3000;

const jsonAccounts = './accounts.json';

app.use(express.json()); // permite receber requisições com JSON

app.listen(port, () => {
  try {
    fs.readFile(jsonAccounts, 'UTF-8', (err, _data) => {
      if (err) {
        const initialJSON = { nextID: 1, accounts: [] };
        fs.writeFile(jsonAccounts, JSON.stringify(initialJSON), (err) => {
          return err;
        });
      }
    });
  } catch (err) {
    console.log(err);
  }

  console.log('API ativa.');
});
