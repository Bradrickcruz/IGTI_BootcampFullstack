// node --experimental-modules ./js/index.js
/** modo commonJS de importação de modulos
const express = require('express');
const app = express();
const port = 3000;
 */
/** Modo ES6+ de importação de modulos
 * precisa de "type": "module" no package.json
 * precisa da flag "--experimental-modules" no cmd
 */

import express from 'express';
const app = express();
const port = 3000;

app.all('/test', (request, response) => {
  // response.send('hello world');
  response.send({ method: request.method });
});

app.get('/pt-br', (request, response) => {
  console.log('/pt-br');
  response.send({ message: 'olá mundo' });
});

app.get('/fr/:id/:name', (request, response) => {
  console.log('/fr');
  response.send({
    id: request.params.id,
    name: request.params.name,
    message: 'Bonjour le monde',
  });
});

app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
