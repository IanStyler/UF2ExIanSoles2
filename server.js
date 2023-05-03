const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mysql = require('mysql');
port = 3080;
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

const connectionMysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'uniiansoles'
});
connectionMysql.connect((err)=>{
  if (err) throw err;
  console.log('Connectat a la BDD!');
});

//Exercici 1____________________
app.get('/EX1', (req, res) => {
  db.query('SELECT ASSIGNATURES.ASSIG_CODI, ASSIGNATURES.ASSIG_NOM FROM ASSIGNATURES, DEPARTAMENT, PROFESSOR, ASSIGNATURES_PROFESSOR WHERE DEPARTAMENT.DEPT_NOM = \'INFORMATICA I MATEMATICA APLICADA\'AND DEPARTAMENT.DEPT_PROF_DNI = PROFESSOR.PROF_DNI AND ASSIGNATURES_PROFESSOR.ASSIGPROF_PROF_DNI = PROFESSOR.PROF_DNI AND ASSIGNATURES_PROFESSOR.ASSIGPROF_ASSIG_CODI = ASSIGNATURES.ASSIG_CODI', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

//Exercici 2____________________
app.post('/EX2', function(req, res) {
  const sql = 'ALTER TABLE ALUMNES ADD COLUMN ALUMN_ZODIAC VARCHAR(25) NULL;'
  connectionMysql.query(sql, function(error, results, fields) {
    if (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        res.status(400).send('Ja existeix');
      } else {
        res.status(500).send(error);
      }
    } else {
      res.status(200).send('fet');
    }
  });
});

//Exercici 4______
app.post('/EX4', (req, res) => {
  const nouDepartament = req.body;

  connectionMysql.query('INSERT INTO DEPARTAMENT SET ?', nouDepartament, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('No puc, pelacanyes');
    } else {
      console.log('Departament afegit amb èxit!');
      res.status(200).send('Departament afegit amb èxit!');
    }
  });
});

