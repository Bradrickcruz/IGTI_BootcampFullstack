// o arquivo "nodemon.json" Ignora arquivos para reiniciar o nodemon
import express from 'express'; // -> para metodos HTTP
import { promises as fs } from 'fs'; // -> para manipulação de arquivos
import winston from 'winston'; // -> para criação de logs
import cors from 'cors'; // -> para liberação ou restrição de uso para dominios
import swaggerUi from 'swagger-ui-express'; // -> para construir a documentação com base no arquivo JSON

import accountRouter from './routes/account.js';
import { swaggerDoc } from './swaggerDoc.js';

const app = express();
const port = 3000;

global.jsonAccounts = './accounts.json'; // global pode ser acessado de qualquer JS do projeto

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'mybankAPI.log' }),
  ],
  format: combine(label({ label: 'mybankAPI' }), timestamp(), myFormat),
});

app.use(express.json()); // permite receber requisições com JSON
// app.use(cors()) // permite que todos os dominios acessem a API
app.use('/account', accountRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, async () => {
  try {
    await fs.readFile(jsonAccounts, 'UTF-8', () => {});
    logger.info('API Ativa');
  } catch (err) {
    const initialJSON = { nextID: 1, accounts: [] };
    await fs.writeFile(jsonAccounts, JSON.stringify(initialJSON), (err) => {
      return { err: err.message };
    });
  }
});
