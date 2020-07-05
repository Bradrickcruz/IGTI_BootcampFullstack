import mongodb from 'mongodb';

const conn = {
  user: 'rick',
  password: 'rick',
  cluster: 'ricktest.ncqqs.gcp',
  dbname: 'sample_airbnb',
};
const uri = `mongodb+srv://${conn.user}:${conn.password}@${conn.cluster}.mongodb.net/${conn.dbname}?retryWrites=true&w=majority`;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  const collection = client.db('sample_mflix').collection('users');

  const docs = await collection.find().toArray();
  console.log(docs);

  const dbList = await client.db().admin().listDatabases();
  console.log('Databases:');
  dbList.databases.forEach((db) => console.log(` - ${db.name}`));
  client.close();
});
