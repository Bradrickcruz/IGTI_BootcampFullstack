import mongoose from 'mongoose';

const conn = {
  user: 'rick',
  password: 'rick',
  cluster: 'ricktest.ncqqs.gcp',
  dbname: 'sample_mflix',
};
const uri = `mongodb+srv://${conn.user}:${conn.password}@${conn.cluster}.mongodb.net/${conn.dbname}?retryWrites=true&w=majority`;

// conecta ao db
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('conectado'))
  .catch((err) => {
    console.log({ err: err.message });
  });

// define o schema do collection
const usersSchema = mongoose.Schema({
  name: { type: String, require: true, default: 'Bryan' },
  email: String,
  password: String,
});

mongoose.model('users', usersSchema);
