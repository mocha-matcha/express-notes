const express = require('express');
const path = require('path');
// Helper method for generating unique ids
const data  = require('./db/db');
const fs = require('fs');
//copied from lessons
const id = () => { return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);};

const PORT = 3001;

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

return res.json(data);
});

app.post('/api/notes',(req,res) => {

console.log(req);
const {title,text} = req.body;
if(title && text)
	{
const newNote = {title,text,'id':id()};
console.log(newNote);
const noteContents = ','+ JSON.stringify(newNote);
fs.appendFile('./db/db.json',noteContents, (err) => {if(err){console.log(err)}else{console.log("good!")};})
	}
});

app.listen(PORT, () =>
	{ console.log(`App listening at http://localhost:${PORT}`);}
);

