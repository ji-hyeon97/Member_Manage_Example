const fs = require('fs');//파일읽기
const express = require('express');
//const bodyParser = require('body-parser'); //설치한 모듈 불러오기
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host:conf.host,
  user:conf.user,
  password:conf.password,
  port:conf.port,
  database:conf.database
});
connection.connect();//연결

app.get('/api/customers', (req, res) => {
  connection.query(//쿼리 사용
    "SELECT * FROM eval_rhinitis",
    (err,rows,fields)=>{
      res.send(rows);
    }
  );
});

app.post('/api/customers', (req, res) => {
  let sql = 'INSERT INTO eval_rhinitis VALUES (?, ?, ?, ?, ?, ?, ?, ?)';   
  let userID = req.body.userID; 
  let date = req.body.date;  
  let wavelength = req.body.wavelength;  
  let laser_power = req.body.laser_power;  
  let swept_time = req.body.swept_time;  
  let cnt_cyto_control = req.body.cnt_cyto_control;  
  let cnt_cyto_experi = req.body.cnt_cyto_experi; 
  console.log(userID);
  console.log(date);
  console.log(wavelength);
  console.log(laser_power);
  console.log(swept_time);
  console.log(cnt_cyto_control);
  console.log(cnt_cyto_experi);
  
  let params = [userID, date, wavelength, laser_power, swept_time, cnt_cyto_control, cnt_cyto_experi];
  
  connection.query(sql, params, 
    (err, rows, fields) => {
      res.send(rows);
    }  
  )  
  });

app.listen(port, () => console.log(`Listening on port ${port}`));