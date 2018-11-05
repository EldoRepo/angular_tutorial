const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const spawn = require('child_process').spawn;


//const ls = spawn('python', ['preparegame.py', '--D1', 'Sig', '--D2', 'Grenzo']);

//ls.stdout.on('data', (data) => {
//  console.log(`stdout: ${data}`);
//});

//ls.stderr.on('data', (data) => {
//  console.log(`stderr: ${data}`);
//});

//ls.on('close', (code) => {
//  console.log(`child process exited with code ${code}`);
//});

// connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/MTG_CARDS',(err, db) => {
      if (err) return console.log(err);

      closure(db);
    });
};

//error handeling
const sendError = (err, res) => {
  response.status = 501;
  response.messgae = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Responce handeling
let response = {
  status: 200,
  data: [],
  message: null
};

//get database objects
router.get('/Sig', (req, res) => {
  connection((db) => {
    db.collection('Sig')
      .find()
      .toArray()
      .then((users)=>{
        response.data = users;
        res.json(response);
    })
    .catch((err) => {
      sendError(err, res);
    });
  });
});

module.exports = router;
