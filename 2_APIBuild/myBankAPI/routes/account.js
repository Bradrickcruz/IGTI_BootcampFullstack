import express from 'express';
import { readFile, writeFile } from 'fs';
import { throws } from 'assert';

const router = express.Router();

// criar nova conta
router.post('/new', (req, res) => {
  let account = req.body;
  readFile(jsonAccounts, 'UTF-8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextID, ...account };
        json.nextID += 1;
        json.accounts.push(account);

        writeFile(jsonAccounts, JSON.stringify(json), (err) => {
          !err
            ? res.send(
                `account[${account.id}] of ${account.name} created with R$${account.balance},00`
              )
            : res.end();
        });
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

// ler todas as contas
router.get('/all', (_req, res) => {
  readFile(jsonAccounts, 'utf-8', (err, data) => {
    if (!err) {
      data = JSON.parse(data);
      delete data.nextID;
      res.send(data);
      return;
    }
    res.send(err);
  });
});

// ler uma conta
router.get('/:id', (req, res) => {
  readFile(jsonAccounts, 'utf-8', (err, data) => {
    try {
      if (err) throw err;

      data = JSON.parse(data);
      let selectedData = data.accounts.find(
        (account) => account.id == req.params.id
      );

      res.send(selectedData);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
});

// deletar uma conta
router.delete('/:id', (req, res) => {
  readFile(jsonAccounts, 'utf-8', (err, data) => {
    try {
      let json = JSON.parse(data);
      let deletedAccount = json.accounts.find((acc) => {
        return acc.id == parseInt(req.params.id, 10);
      });

      let updatedAccounts = json.accounts.filter((acc) => {
        return acc.id != parseInt(req.params.id, 10);
      });

      json.accounts = updatedAccounts;
      writeFile(jsonAccounts, JSON.stringify(json), (err) => {
        !err
          ? res.send(
              `account[${deletedAccount.id}] of ${deletedAccount.name} deleted sucessfully.`
            )
          : res.status(400).send({ error: err });
      });
    } catch (error) {
      res.status(400).send({ error: error });
    }
  });
});

// alterar todas as propriedades de uma conta
router.put('/', (req, res) => {
  let accToUpdate = req.body;
  if (accToUpdate.id && accToUpdate.balance && accToUpdate.name) {
    readFile(jsonAccounts, 'utf-8', (err, data) => {
      try {
        if (err) throw err;

        let json = JSON.parse(data);
        let updatedAccIndex = json.accounts.findIndex((acc) => {
          return acc.id == accToUpdate.id;
        });
        json.accounts[updatedAccIndex].name = accToUpdate.name;
        json.accounts[updatedAccIndex].balance = accToUpdate.balance;

        writeFile(jsonAccounts, JSON.stringify(json), (err) => {
          if (!err) {
            res.send(
              `The account[${accToUpdate.id}] (${accToUpdate.name}) was updated!`
            );
          } else {
            console.log(err);
            throw err;
          }
        });
      } catch (error) {
        res.status(400).send({ error: error });
      }
    });
  } else {
    res.status(400).send({ error: 'Body without some properties!' });
  }
});

// alterar propriedade "balance" de uma conta == DEPOSITAR
router.post('/deposit', (req, res) => {
  readFile(jsonAccounts, 'utf-8', (err, data) => {
    try {
      if (err) throw err;

      let jsonDATA = JSON.parse(data);
      let accIndex = jsonDATA.accounts.findIndex((acc) => {
        return acc.id == req.body.id;
      });

      jsonDATA.accounts[accIndex].balance += req.body.value;

      writeFile(jsonAccounts, JSON.stringify(jsonDATA), (err) => {
        try {
          if (err) throw err;

          res.send(
            `R$${req.body.value},00 was deposited sucessfully in [${req.body.id}] account!`
          );
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
});

// alterar propriedade "balance" de uma conta == SACAR
router.post('/transaction', (req, res) => {
  let params = req.body;
  readFile(jsonAccounts, 'utf-8', (err, data) => {
    try {
      if (err) throw err;

      let jsonDATA = JSON.parse(data);
      let accIndex = jsonDATA.accounts.findIndex((acc) => acc.id == params.id);

      if (jsonDATA.accounts[accIndex].balance < params.value)
        throw new Error('Balance not enougth to transaction');

      jsonDATA.accounts[accIndex].balance -= params.value;

      writeFile(jsonAccounts, JSON.stringify(jsonDATA), (err) => {
        try {
          if (err) throw err;

          res.send(
            `R$${params.value} was transactioned from [${params.id}] Account.`
          );
        } catch (error) {}
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
});

export default router;
