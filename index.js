'use strict';

const { inspect } = require('util');
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.static('static'));

app.get('/music/:id', function(req, res) {
  let id = req.params.id;
  let filename = id + '.mp3';
  let nameWithPath = path.join('static/', filename);

  if(fs.existsSync(nameWithPath)) {
    fs.readFile(nameWithPath, function(err, data) {
      if(err) res.json({error: `error loading file with name ${filename}`});
      let soundByteArray = Array.from(data);
      res.json(soundByteArray);
    });
  } else
    res.json({error: `no file found with name ${filename}`});
});

app.get('/', function(req, res){
   res.send("Hello world!");
});

let port = process.env.PORT ? process.env.PORT : 3000;
app.listen(3000);

console.log(`serving on http://localhost:${port}`);
