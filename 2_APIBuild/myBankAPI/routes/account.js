import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';

const router = express.Router();

// PROMISES criar nova conta
router.post('/new', async (req, res) => {
  let account = req.body;
  await fs
    .readFile(jsonAccounts, 'UTF-8')
    .then(async (data) => {
      let json = JSON.parse(data);
      account = { id: json.nextID, ...account };
      json.nextID += 1;
      json.accounts.push(account);

      await fs
        .writeFile(jsonAccounts, JSON.stringify(json))
        .then(() => {
          res.send(
            `Account [${account.id}] of ${account.name} created sucessfully!`
          );
          logger.info(`POST /account - ${JSON.stringify(account)}`);
        })
        .catch((err) => {
          res.status(400).send({ error: err.message });
          logger.error(`POST /account - ${err.message}`);
        });
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
});

// PROMISES ler todas as contas
// com o cors() permite que todos os dominios acessem esse metodo
router.get('/all', cors(), async (_req, res) => {
  await fs
    .readFile(jsonAccounts, 'utf-8')
    .then((data) => {
      data = JSON.parse(data);
      delete data.nextID;
      res.send(data);
      logger.info(`GET /account/all`);
    })
    .catch((err) => {
      res.send({ err: err.message });
      logger.error(`GET /account/all - ${err.message}`);
    });
});

// PROMISES ler uma conta
router.get('/:id', async (req, res) => {
  await fs
    .readFile(jsonAccounts, 'utf-8')
    .then((data) => {
      data = JSON.parse(data);
      let selectedData = data.accounts.find(
        (account) => account.id == req.params.id
      );

      res.send(selectedData);
      logger.info(`GET /account/:id - ${JSON.stringify(selectedData)}`);
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
      logger.error(`GET /account/:id - ${err.message}`);
    });
});

// PROMISES deletar uma conta
router.delete('/:id', async (req, res) => {
  await fs.readFile(jsonAccounts, 'utf-8').then(async (data) => {
    let json = JSON.parse(data);
    let deletedAccount = json.accounts.find((acc) => {
      return acc.id == parseInt(req.params.id, 10);
    });

    let updatedAccounts = json.accounts.filter((acc) => {
      return acc.id != parseInt(req.params.id, 10);
    });

    json.accounts = updatedAccounts;
    await fs
      .writeFile(jsonAccounts, JSON.stringify(json))
      .then(() => {
        res.send(
          `account[${deletedAccount.id}] of ${deletedAccount.name} deleted sucessfully.`
        );
        logger.info(`DELETE /account/:id - ${JSON.stringify(deletedAccount)}`);
      })
      .catch((err) => {
        res.status(400).send({ error: err.message });
        logger.error(`DELETE /account/:id - ${err.message}`);
      });
  });
});

// PROMISES alterar todas as propriedades de uma conta
router.put('/', async (req, res) => {
  let accToUpdate = req.body;
  if (accToUpdate.id && accToUpdate.balance && accToUpdate.name) {
    await fs
      .readFile(jsonAccounts, 'utf-8')
      .then(async (data) => {
        let json = JSON.parse(data);
        let updatedAccIndex = json.accounts.findIndex((acc) => {
          return acc.id == accToUpdate.id;
        });
        json.accounts[updatedAccIndex].name = accToUpdate.name;
        json.accounts[updatedAccIndex].balance = accToUpdate.balance;

        await fs
          .writeFile(jsonAccounts, JSON.stringify(json))
          .then(() => {
            res.send(
              `The account[${accToUpdate.id}] (${accToUpdate.name}) was updated!`
            );
            logger.info(`PUT /account - ${JSON.stringify(accToUpdate)}`);
          })
          .catch((err) => {
            res.status(400).send({ error: error });
            logger.error(`PUT /account - ${err.message}`);
          });
      })
      .catch((err) => {
        res.status(400).send({ error: error });
        logger.error(`PUT /account - ${err.message}`);
      });
  } else {
    res.status(400).send({ error: 'Body without some properties!' });
  }
});

// PROMISES alterar propriedade "balance" de uma conta == DEPOSITAR
router.post('/deposit', async (req, res) => {
  let params = req.body;
  await fs
    .readFile(jsonAccounts, 'utf-8')
    .then(async (data) => {
      let jsonDATA = JSON.parse(data);
      let accIndex = jsonDATA.accounts.findIndex((acc) => {
        return acc.id == params.id;
      });

      jsonDATA.accounts[accIndex].balance += params.value;

      await fs
        .writeFile(jsonAccounts, JSON.stringify(jsonDATA))
        .catch((err) => {
          res.status(400).send({ error: err.message });
          logger.error(`POST /account/deposit - ${err.message}`);
        })
        .then(() => {
          res.send(
            `R$${params.value},00 was deposited sucessfully in [${params.id}] account!`
          );
          logger.info(`POST /account/deposit - ${JSON.stringify(params)}`);
        });
    })
    .catch((err) => {
      res.status(400).send({ error: error.message });
      logger.error(`POST /account/deposit - ${err.message}`);
    });
});

// PROMISES alterar propriedade "balance" de uma conta == SACAR
router.post('/transaction', async (req, res) => {
  let params = req.body;
  await fs
    .readFile(jsonAccounts, 'utf-8')
    .then(async (data) => {
      let jsonDATA = JSON.parse(data);
      let accIndex = jsonDATA.accounts.findIndex((acc) => acc.id == params.id);

      if (jsonDATA.accounts[accIndex].balance < params.value)
        throw new Error('Balance not enougth to transaction');

      jsonDATA.accounts[accIndex].balance -= params.value;

      await fs
        .writeFile(jsonAccounts, JSON.stringify(jsonDATA))
        .catch((err) => {
          res.status(400).send({ error: error.message });
          logger.error(`POST /account/transaction - ${err.message}`);
        })
        .then(() => {
          res.send(
            `R$${params.value} was transactioned from [${params.id}] Account.`
          );
          logger.info(`POST /account/transaction - ${JSON.stringify(params)}`);
        });
    })
    .catch((err) => {
      res.status(400).send({ error: error.message });
      logger.error(`POST /account/transaction - ${err.message}`);
    });
});

export default router;
