import express from 'express';
import { promises as fs } from 'fs';

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
        })
        .catch((err) => {
          res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
});

// PROMISES ler todas as contas
router.get('/all', async (_req, res) => {
  await fs
    .readFile(jsonAccounts, 'utf-8')
    .then((data) => {
      data = JSON.parse(data);
      delete data.nextID;
      res.send(data);
    })
    .catch((err) => {
      res.send({ err: err.message });
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
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
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
      })
      .catch((err) => {
        res.status(400).send({ error: err });
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
          })
          .catch((err) => {
            res.status(400).send({ error: error });
          });
      })
      .catch((err) => {
        res.status(400).send({ error: error });
      });
  } else {
    res.status(400).send({ error: 'Body without some properties!' });
  }
});

// PROMISES alterar propriedade "balance" de uma conta == DEPOSITAR
router.post('/deposit', async (req, res) => {
  await fs
    .readFile(jsonAccounts, 'utf-8')
    .then(async (data) => {
      let jsonDATA = JSON.parse(data);
      let accIndex = jsonDATA.accounts.findIndex((acc) => {
        return acc.id == req.body.id;
      });

      jsonDATA.accounts[accIndex].balance += req.body.value;

      await fs
        .writeFile(jsonAccounts, JSON.stringify(jsonDATA))
        .catch((err) => {
          res.status(400).send({ error: err.message });
        })
        .then(() => {
          res.send(
            `R$${req.body.value},00 was deposited sucessfully in [${req.body.id}] account!`
          );
        });
    })
    .catch((err) => {
      res.status(400).send({ error: error.message });
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
        })
        .then(() => {
          res.send(
            `R$${params.value} was transactioned from [${params.id}] Account.`
          );
        });
    })
    .catch((err) => {
      res.status(400).send({ error: error.message });
    });
});

export default router;
