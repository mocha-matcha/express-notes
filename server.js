const express = require('express');
const path = require('path');
// Helper method for generating unique ids
const data  = require('./db/db');
const fs = require('fs');
//copied from lessons
const id = () => { return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);};

const PORT = 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for reviews
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname,'/public/notes.html'));
});


app.get('/api/notes', (req,res) => {

return res.status(200).json(data);
});

app.post('/api/notes',(req,res) => {

console.log(req);
const {title,text} = req.body;
if(title && text)
	{
const newNote = {title,text,'id':id()};
console.log(newNote);
data.push(newNote);
const dataString = JSON.stringify(data);
fs.writeFileSync('./db/db.json',dataString,'utf-8');

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    return res.status(201).json(response);

	}
	else
	{

    return res.status(500).json('Error in posting review');

	}
});


app.delete('/api/notes/:id',(req,res) =>{
 const noteIndex = req.params.id;
	console.log(data);
	data.splice(noteIndex,1);
	console.log(data);
    res.status(204).send({});
});

app.listen(PORT, () =>
	{ console.log(`App listening at http://localhost:${PORT}`);}
);

