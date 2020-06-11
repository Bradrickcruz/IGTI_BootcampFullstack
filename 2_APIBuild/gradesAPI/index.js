import express from 'express';
import { promises as fs } from 'fs';

const app = express();
const port = 3000;
const PATH_grades = './grades.json';

app.use(express.json());

// endpoint de cadastro de nova nota
app.post('/newgrade', async (req, res) => {
  let grade = req.body;
  await fs
    .readFile(PATH_grades, 'UTF-8')
    .then((data) => {
      let data_as_JSON = JSON.parse(data);
      let newGrade = {
        id: data_as_JSON.nextId,
        ...grade,
        timestamp: new Date(),
      };
      data_as_JSON.nextId += 1;

      data_as_JSON.grades.push(newGrade);

      fs.writeFile(PATH_grades, JSON.stringify(data_as_JSON))
        .then(() => {
          res.send({ msg: 'New grade registered.', register: newGrade });
        })
        .catch((err) => {
          res.status(400).send({ err: err.message });
        });
    })
    .catch((err) => res.status(400).send({ err: err.message }));
});

// endpoint de atualização de nota
app.put('/updategrade', async (req, res) => {
  let gradeDATA = req.body;
  await fs
    .readFile(PATH_grades, 'utf-8')
    .then((data) => {
      let data_as_JSON = JSON.parse(data);
      let indexGrade = data_as_JSON.grades.findIndex((grade) => {
        return grade.id == gradeDATA.id;
      });
      data_as_JSON.grades[indexGrade].student = gradeDATA.student;
      data_as_JSON.grades[indexGrade].subject = gradeDATA.subject;
      data_as_JSON.grades[indexGrade].type = gradeDATA.type;
      data_as_JSON.grades[indexGrade].value = gradeDATA.value;
      data_as_JSON.grades[indexGrade].timestamp = new Date();

      fs.writeFile(PATH_grades, JSON.stringify(data_as_JSON))
        .then(() => {
          res.send({
            msg: 'Register updated',
            register: data_as_JSON.grades[indexGrade],
          });
        })
        .catch((err) => {
          res.status(400).send({ err: err.message });
        });
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
});

// endpoint de exclusão de nota
app.delete('/deletegrade/:id', async (req, res) => {
  let gradeID = req.params.id;
  await fs
    .readFile(PATH_grades, 'utf-8')
    .then((data) => {
      let data_as_JSON = JSON.parse(data);
      let newGrades = data_as_JSON.grades.filter((grade) => {
        return grade.id != gradeID;
      });
      console.log(newGrades);

      data_as_JSON.grades = newGrades;
      fs.writeFile(PATH_grades, JSON.stringify(data_as_JSON)).then(() => {
        res.send({ msg: 'Register deleted sucessfully' });
      });
      // res.end();
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
});

// endpoint de seleção de nota
app.get('/grade/:id', async (req, res) => {
  let gradeID = req.params.id;
  console.log(gradeID);
  await fs
    .readFile(PATH_grades, 'utf-8')
    .then((data) => {
      let data_as_JSON = JSON.parse(data);
      let selectedGrade = data_as_JSON.grades.find((grade) => {
        return grade.id == gradeID;
      });
      if (selectedGrade) {
        res.send(selectedGrade);
      } else {
        throw new Error(`No register with ID ${gradeID}`);
      }
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
});

// endpoint para soma das notas de um student em uma subject
app.get('/grade/sum/:student/:subject', async (req, res) => {
  let params = req.params;

  await fs
    .readFile(PATH_grades, 'utf-8')
    .then((data) => {
      let data_as_JSON = JSON.parse(data);
      let sumOfGrades = data_as_JSON.grades.reduce(
        (acc, { student, subject, value }) => {
          if (student == params.student && subject == params.subject) {
            return acc + value;
          } else {
            return acc + 0;
          }
        },
        0
      );
      res.send({ ...params, sumOfGrades: sumOfGrades });
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
});

// endpoint para media das notas de um subject e type
app.get('/grade/avg/:subject/:type', async (req, res) => {
  let params = req.params;

  await fs
    .readFile(PATH_grades, 'utf-8')
    .then((data) => {
      let data_as_JSON = JSON.parse(data);
      let countGrades = 0;
      let sumOfGrades = data_as_JSON.grades.reduce(
        (acc, { subject, type, value }) => {
          if (subject == params.subject && type == params.type) {
            countGrades += 1;
            return acc + value;
          } else {
            return acc;
          }
        },
        0
      );
      let avgOfGrades = sumOfGrades / countGrades;

      res.send({ ...params, avgOfGrades: avgOfGrades });
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
});

// endpoint selecionar as 3 melhores notas de um subject e type
app.get('/grade/top3/:subject/:type', async (req, res) => {
  let params = req.params;

  await fs
    .readFile(PATH_grades, 'utf-8')
    .then((data) => {
      let data_as_JSON = JSON.parse(data);

      let selectedGrades = data_as_JSON.grades.filter(({ subject, type }) => {
        return subject == params.subject && type == params.type;
      });

      selectedGrades = selectedGrades.sort((a, b) => {
        if (a.value > b.value) {
          return -1;
        } else if (a.value == b.value) {
          return 0;
        } else {
          return 1;
        }
      });
      console.log(selectedGrades.length);
      if (selectedGrades[3]) {
        while (selectedGrades.length > 3) {
          selectedGrades.pop();
        }
        res.send(selectedGrades);
      } else {
        res.send(selectedGrades);
      }
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
});

app.listen(port, () => {
  console.log('API Started!');
});
