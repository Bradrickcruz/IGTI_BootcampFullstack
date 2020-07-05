import express from 'express';
import accountModel from '../Models/accountSchema.js';

const app = express();
app.use(express.json());

// registra deposito em uma conta de uma agencia
app.post('/deposit', async (req, res) => {
  try {
    const {
      agencia: selectedAgencia,
      conta: selectedConta,
      deposito,
    } = req.body;

    const selectedAccount = await accountModel.findOne({
      agencia: selectedAgencia,
      conta: selectedConta,
    });
    if (selectedAccount) {
      selectedAccount.balance += deposito;
      selectedAccount.save();

      res.send({
        msg: "Account's balance was updated.",
        newBalance: selectedAccount.balance,
      });
    } else {
      throw new Error('Account does not exist.');
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// registra saque em uma conta de uma agencia
app.post('/transaction', async (req, res) => {
  try {
    const { agencia: selectedAgencia, conta: selectedConta, saque } = req.body;

    const selectedAccount = await accountModel.findOne({
      agencia: selectedAgencia,
      conta: selectedConta,
    });
    if (selectedAccount) {
      if (selectedAccount.balance < saque)
        throw new Error('The account has no value enough.');

      selectedAccount.balance -= saque;
      selectedAccount.save();

      res.send({
        success: "Account's balance was updated.",
        newBalance: selectedAccount.balance,
      });
    } else {
      throw new Error('Account does not exist.');
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// consulta o saldo de uma conta em uma agencia
app.get('/balance/:agencia/:conta', async (req, res) => {
  try {
    const { agencia: selectedAgencia, conta: selectedConta } = req.params;

    const selectedAccount = await accountModel.find({
      agencia: selectedAgencia,
      conta: selectedConta,
    });

    if (selectedAccount.length) {
      res.send({
        success: 'Account founded.',
        currentBalance: selectedAccount[0].balance,
      });
    } else {
      throw new Error('Account does not exist.');
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// exclui uma conta de uma agencia e mostra o total de contas na agencia
app.delete('/account', async (req, res) => {
  try {
    const { agencia: selectedAgencia, conta: selectedConta } = req.body;
    const selectedAccount = await accountModel.findOneAndDelete({
      agencia: selectedAgencia,
      conta: selectedConta,
    });
    console.log(selectedAccount);
    if (!selectedAccount) throw new Error('Account does not exist.');

    const countContas = await accountModel.collection.countDocuments({
      agencia: selectedAgencia,
    });
    console.log(countContas);

    res.send({ success: 'Account was deleted.', accountsCount: countContas });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// transfere valor de uma conta para outra
app.patch('/transfer', async (req, res) => {
  try {
    const { origConta, destConta, transferValue } = req.body;
    if (transferValue <= 0)
      throw new Error('Transfer value is an invalid value.');
    let tax = false;

    const origDoc = await accountModel.findOne({
      conta: origConta,
    });

    const destDoc = await accountModel.findOne({
      conta: destConta,
    });

    let value = transferValue;
    if (origDoc.agencia != destDoc.agencia) {
      value += 8;
      tax = true;
    }

    if (origDoc.balance < value)
      throw new Error('The initial account does not have value enough.');

    origDoc.balance -= value;
    await origDoc.save();
    res.send({
      success: 'The bank transfer was done.',
      currentBalace_origAccount: origDoc.balance,
      taxApplied: tax,
    });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.get('/avg/:agencia', async (req, res) => {
  try {
    const { agencia } = req.params;

    // db.accounts.aggregate([{$project:{_id:0}},{$match:{agencia:25}},{$group:{_id:null,avg:{$avg:"$balance"}}}])
    const avg = await accountModel.aggregate([
      {
        $project: { _id: 0 },
      },
      {
        $match: { agencia: Number(agencia) },
      },
      {
        $group: { _id: null, avg: { $avg: '$balance' } },
      },
    ]);
    res.send({ average: avg[0].avg });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.get('/smallbalance/:value', async (req, res) => {
  try {
    // db.accounts.find({},{_id:0,name:0}).sort({balance:1})
    const { value } = req.params;
    const all = await accountModel.find({});
    if (value > all.length) throw new Error('Value not suported.');
    const filter = await accountModel
      .find({}, { _id: 0, name: 0 }, { limit: Number(value) })
      .sort({ balance: 1 });
    console.log(filter);
    res.send({ balances: filter });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.get('/bigbalance/:value', async (req, res) => {
  try {
    // db.accounts.find({},{_id:0}).sort({balance:-1})
    const { value } = req.params;
    const all = await accountModel.find({});
    if (value > all.length) throw new Error('Value not suported.');
    const filter = await accountModel
      .find({}, { _id: 0 }, { limit: Number(value) })
      .sort({ balance: -1 });
    console.log(filter);
    res.send({ balances: filter });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.patch('/setprivate', async (req, res) => {
  try {
    const agencias = await accountModel.find({}).distinct('agencia');

    agencias.forEach(async (agencia) => {
      let account = await accountModel
        .find({ agencia: agencia })
        .sort({ balance: -1 });
      account = account[0];
      await accountModel.updateOne({ _id: account._id }, { agencia: 99 });
    });
    const privates = await accountModel.find({ agencia: 99 });
    res.send({ privates: privates });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

export { app as accountRouter };
