const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.Port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let dataStore = [{ name: "Teacher", message: "API is live!"}];

//GET: Send data from the datastore to the user
app.get('/api/messages', (req, res) => {
    res.json(dataStore);
});

//POST: receive data from the form
app.post('/api/messages', (req, res) => {
    dataStore.push(req.body);
    res.status(201).send({message:"Received!"});
});

app.listen(PORT, () => console.log ('Server: https://localhost:${PORT}'));

//Reminder: node server.js in terminal to start it running