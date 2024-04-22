import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173'
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get('/test', (req, res) => {
    res.send("Veikia");
});

let tasks = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
  ];

  //view all tasks
  app.get('/api/tasks', (req, res) => {
    res.json(tasks);
  });

//add task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
})

//update task

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.title = title;
    res.json(tasks);
});

//delete task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).end;
});



app.listen(5559, () => {
    console.log('http://localhost:5559');
})