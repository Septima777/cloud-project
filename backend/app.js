const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'database-2.cjttdajuhgpx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'cloudpj.',
  database: 'myDatabase'
});

app.use(cors())
app.use(bodyParser.json())

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');
  //   sql="insert into brownies_tb (brownies_id, brownies_name, brownies_price) values('5', 'bb', '50')";
  //   connection.query(sql, function(err, result){
  //     if(err) throw err;
  //     console.log("Insert complete");
  //   });
});

app.listen(PORT, () => {
  console.log('Server is running on Port: ' + PORT)
})
