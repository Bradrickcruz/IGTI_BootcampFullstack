import express from 'express';
import { promises as fs } from 'fs';

const app = express();
const port = 3000;

const citiesPATH = './cidades.json';
const statesPATH = './estados.json';

app.use(express.json());

// le o arquivo Cidades.json
app.get('/cidades', async (req, res) => {
  fs.readFile(citiesPATH, 'utf-8')
    .then((data) => {
      let jsonDATA = JSON.parse(data);

      res.send(jsonDATA);
    })
    .catch((err) => res.send({ err: err.message }));
});

// le o arquivo Estados.json
app.get('/estados', async (req, res) => {
  await fs
    .readFile(statesPATH, 'utf-8')
    .then((data) => {
      let jsonDATA = JSON.parse(data);

      res.send(jsonDATA);
    })
    .catch((err) => res.send({ err: err.message }));
});

// cria JSON para cada estado
app.get('/split', async (req, res) => {
  await fs
    .readFile(citiesPATH, 'utf-8')
    .then(async (data) => {
      let citiesDATA = JSON.parse(data);

      // prettier-ignore
      await fs.readFile(statesPATH, 'utf-8')
      .then(async (data) => {
        let statesDATA = JSON.parse(data);

        statesDATA.forEach(async state => {
          let stateCities = []
          citiesDATA.forEach(city => {
            if (city.Estado == state.ID){
              stateCities.push(city)
            }
          })
          await fs.writeFile(`./states/${state.Sigla}.json`,JSON.stringify(stateCities))
          .then(()=>{
            console.log(`${state.Sigla}.json criado com sucesso`)
          })
          .catch(err => {
            res.status(400).send({err:err.message})
          })
        });
        
        res.status(200).send("arquivos JSON criados com sucesso.");
      });
    })
    .catch((err) => res.send({ err: err.message }));
});

// le o JSON correspondente ao UF requirido
app.get('/select/:uf', async (req, res) => {
  let UF = req.params.uf.toUpperCase();

  await fs
    .readFile(`./states/${UF}.json`, 'utf-8')
    .then((data) => {
      let cities = JSON.parse(data);
      let citiesDATA = {
        totalCities: cities.length,
        cities: [...cities],
      };
      res.send(citiesDATA);
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
});

app.get('/top5', async (req, res) => {
  /**TODO: parei aqui */
  let stateList = [];
  // lista as siglas dos estados
  await fs
    .readFile(statesPATH, 'utf-8')
    .then((data) => {
      let statesDATA = JSON.parse(data);
      stateList = statesDATA.map(({ Sigla }) => {
        return { Sigla, countCities: 0 };
      });
      res.send(stateList);
      // conta as cidades de cada estado
      stateList = stateList.forEach(async ({ Sigla, countCities }) => {
        await fs
          .readFile(`./states/${Sigla}.json`, 'utf-8')
          .then((data) => {
            let count = JSON.parse(data).length;
            countCities = count;
            console.log(stateList);
          })
          .catch((err) => {
            res.status(400).send({ err: err.message });
          });
      });
      console.log(stateList);
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });

  // ordena a lista do maior ao menor
  stateList = stateList.sort((a, b) => {
    return b - a;
  });
  // filtra so os 5 primeiros
  // stateList = stateList.filter((state) => {
  //   return state.countCities < stateList[4].countCities;
  // });

  // res.send(stateList);
});

app.listen(port, async () => {
  console.log('API Ativa');
});
