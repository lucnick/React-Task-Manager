const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const fs = require('fs');
const path = require('path');


app.use(cors());
app.use(express.json());


// Removing items from the file

app.post('/remove-data', (req, res) => {
  const indexToRemove = req.body.index;
  const filePath = path.join(__dirname, 'data', 'userInput.txt');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading file' });
    } else {
      const lines = data.split('\n').filter(line => line.trim() !== '');

      if (indexToRemove >= 0 && indexToRemove < lines.length) {
        lines.splice(indexToRemove, 1); // Remove the item at the specified index

        // Update the file content
        fs.writeFile(filePath, lines.join('\n'), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error writing to file' });
          } else {
            console.log('Text removed from file');
            res.json({ message: 'Text removed from file' });
          }
        });
      } else {
        res.status(400).json({ error: 'Invalid index provided' });
      }
    }
  });
});



// Writing to the file

app.post('/write-file', (req, res) => {
    const userText = req.body.text;
    const filePath = path.join(__dirname, 'data', 'userInput.txt');
  
    fs.appendFile(filePath, userText + '\n', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error writing to file' });
      } else {
        console.log('Text written to file');
        res.json({ message: 'Text written to file' });
      }
    });
  });


app.get('/get-data', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'userInput.txt');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading file' });
    } else {
      const lines = data.split('\n').filter(line => line.trim() !== '');
      res.json({ data: lines });
    }
  });
});


// Running the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

