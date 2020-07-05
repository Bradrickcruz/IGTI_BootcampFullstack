import express from 'express';
import studentModel from '../models/studentModel.js';

const app = express();
app.use(express.json());

app.get('/student', async (req, res) => {
  try {
    const students = await studentModel.find({});
    res.send(students);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.post('/student', async (req, res) => {
  try {
    if (!req.body) throw new Error('Body not defined');
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.delete('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndDelete({ _id: req.params.id });
    if (!student) throw new Error('Id not founded on DB');
    res.send(student);
  } catch (error) {
    res.status(500).send({ DB_Error: error.message });
  }
});

app.patch('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!student) throw new Error('Id not founded on DB');
    res.send(student);
  } catch (error) {
    res.status(500).send({ DB_Error: error.message });
  }
});

export { app as studentRouter };

