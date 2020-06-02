const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json()); // permite receber requisições com JSON

app.post('/account', (req, res) => {
  account = req.body;
  fs.readFile('./accounts.json', 'UTF-8', (err, data) => {
    if (!err) {
      let json = JSON.parse(data);
      account = { id: json.nextID, ...account };
      console.log(account);
      json.nextID += 1;
      json.accounts.push(account);

      fs.writeFile('./accounts.json', JSON.stringify(json), (err) => {
        return err;
      });
    }
  });

  res.send(`account of ${req.body.name} created with R$${req.body.balance},00`);
});

app.listen(port, () => {
  try {
    fs.readFile('./accounts.json', 'UTF-8', (err, data) => {
      if (err) {
        const initialJSON = { nextID: 1, accounts: [] };
        fs.writeFile('./accounts.json', JSON.stringify(initialJSON), (err) => {
          return err;
        });
      } else {
        console.log(data);
      }
    });
  } catch (err) {
    console.log(err);
  }

  console.log('API ativa.');
});
