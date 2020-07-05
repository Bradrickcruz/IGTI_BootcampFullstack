import express from 'express';
import { accountRouter } from './Routes/accountsRouter.js';
import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

const app = express();
const PORT = 3000;

(async () => {
  try {
    const configDB = { pwd: 'rick', dbDefault: 'myBankAPI' };
    const uri = `mongodb+srv://rick:${configDB.pwd}@ricktest.ncqqs.gcp.mongodb.net/${configDB.dbDefault}?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log({ MongoDB_Error: err.message });
  }
})();

app.use(express.json());
app.use(accountRouter);

app.listen(PORT, (err) => {
  err ? console.log({ err: err.message }) : console.log({ msg: 'API actived' });
});
