const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let dataStore = [
    { name: "Teacher", message: "API is live!" }
];

app.post('/api/messages', (req, res) => {
    const newMessage = {
        name: req.body.name,
        message: req.body.message
    };

    if (newMessage.name.length == 0) {
        res.status(400).json('Empty Name');
        return;
    }

    if (newMessage.message.length < 5) {
        res.status(400).json('Too short message');
        return;
    }

    dataStore.push(newMessage);
    res.status(201).json(newMessage);
});


//GET: Send data from the datastore to the user
app.get('/api/messages', (req, res) => {
    res.json(dataStore);
});

// DELETE: Remove a message by its index
app.delete('/api/messages/:id', (req, res) => {
    dataStore.splice(req.params.id, 1);
    res.json({ message: "Deleted!" });
});

app.listen(PORT, () => console.log (`Server: http://localhost:${PORT}`));



//Reminder: type node server.js in terminal to start it running
