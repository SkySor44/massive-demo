const express = require('express');
const bodyParser = require('body-parser');

//=======================================================================//
//====Everything BELOW is how to set up massive after it is installed====//
//=======================================================================//

const massive = require('massive');

const connectionString = 'postgres://rrirkutluxktdp:dd323797e08c9c24fe70d564f628c2e555efc497a75a4052b653281d897454fa@ec2-54-83-19-244.compute-1.amazonaws.com:5432/deorpeeb6uhvfb?ssl=true';



//=======================================================================//
//====Everything ABOVE is how to set up massive after it is installed====//
//=======================================================================//


const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  //Massive will go to the req copy of app and grab the 'db' expres setting we made at the bottom (which is the massive connection to your database) and assign it to the const db
  const db = req.app.get('db');
//You can invoke the getAllInjuries sql file for it to run the code inside to get the injuries table and then return a promise to send your variable you called injuries.
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  });
  })
 

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
 //Filtering by state based on the query in the URL
  if(state){
    db.getIncidentsByState({state: state}).then(incidents => {
      res.send(incidents)
    })
  } else{
    db.getAllIncidents().then(incidents =>{
      res.send(incidents);
  });
  }
  })
  

app.post('/incidents', (req, res) => {
  const incident = req.body;
  const db = req.app.get('db');

  db.createIncident(incident).then(results => {
    res.send(results[0]);
  });
  });
 



//=======================================================================//
//====Everything BELOW is how to set up massive after it is installed====//
//=======================================================================//
//Put the app.listen inside the massive callback function
//app.set added a setting called 'db' and set its value to the massive connection
massive(connectionString).then(connection => {
  app.set('db', connection)//This is an express setting 
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});


