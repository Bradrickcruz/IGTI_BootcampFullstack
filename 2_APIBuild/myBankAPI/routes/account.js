import express from 'express';
import { readFile, writeFile } from 'fs';

const router = express.Router();

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

router.get('/:id', (req, res) => {
  readFile(jsonAccounts, 'utf-8', (err, data) => {
    if (!err) {
      data = JSON.parse(data);
      let selectedData = data.accounts.find(
        (account) => account.id == req.params.id
      );

      res.send(selectedData);
      return;
    }
    res.send(err);
  });
});

export default router;
