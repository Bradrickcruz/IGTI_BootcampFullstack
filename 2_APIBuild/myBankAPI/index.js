const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json()); // permite receber requisições com JSON

app.post('/account', (req, res) => {
  account = req.body;
  fs.readFile('./accounts.json', 'UTF-8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextID, ...account };
        json.nextID += 1;
        json.accounts.push(account);

        fs.writeFile('./accounts.json', JSON.stringify(json), (err) => {
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

app.listen(port, () => {
  try {
    fs.readFile('./accounts.json', 'UTF-8', (err, data) => {
      if (err) {
        const initialJSON = { nextID: 1, accounts: [] };
        fs.writeFile('./accounts.json', JSON.stringify(initialJSON), (err) => {
          return err;
        });
      }
    });
  } catch (err) {
    console.log(err);
  }

  console.log('API ativa.');
});
