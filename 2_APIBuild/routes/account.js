app.post('/new', (req, res) => {
  let account = req.body;
  fs.readFile(jsonAccounts, 'UTF-8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextID, ...account };
        json.nextID += 1;
        json.accounts.push(account);

        fs.writeFile(jsonAccounts, JSON.stringify(json), (err) => {
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

app.get('/all', (_req, res) => {
  fs.readFile(jsonAccounts, 'utf-8', (err, data) => {
    if (!err) {
      data = JSON.parse(data);
      delete data.nextID;
      res.send(data);
      return;
    }
    res.send(err);
  });
});
