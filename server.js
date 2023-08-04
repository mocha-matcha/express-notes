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

app.get('/api/notes',(req,res) =>{

console.log(data);
res.sendFile(path.join(__dirname,'/db/db.json'));
return data;


});

app.get('/*', (req,res) => {

res.sendFile(path.join(__dirname,'/public/404.html'))

});



app.post('/api/notes',(req,res) => {
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
console.log(req.body);
if(title && text)
	{

const newNote = {title,text,'id':id()};
data.push(newNote);
const response = {status:"success",body:newNote}
res.status(201).json(response);
fs.appendFile('./db/db.json',JSON.stringify(newNote),(err) => {
  if (err) {
    console.log(err);
  }
  else {
    // Get the file contents after the append operation
    console.log("\nFile Contents of file after append:",
      fs.readFileSync("example_file.txt", "utf8"));
  }});

	}
else
	{

res.status(500).json('post error');
	}

}


);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

