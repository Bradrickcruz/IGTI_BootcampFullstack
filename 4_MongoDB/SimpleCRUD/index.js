import express from 'express';
import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

(async () => {
  try {
    const configDB = { pwd: 'rick', dbDefault: 'grades' };
    const uri = `mongodb+srv://rick:${configDB.pwd}@ricktest.ncqqs.gcp.mongodb.net/${configDB.dbDefault}?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log({ MongoDB_Error: err.message });
  }
})();

import { studentRouter } from './routes/studentRouter.js';

const PORT = 3000;
const app = express();

app.use(studentRouter);

app.listen(PORT, () => {
  console.log('API iniciada');
});
