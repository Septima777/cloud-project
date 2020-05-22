const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'database-2.cjttdajuhgpx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'cloudpj.',
  database: 'myDatabase'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
//   sql="insert into brownies_tb (brownies_id, brownies_name, brownies_price) values('5', 'bb', '50')";
//   connection.query(sql, function(err, result){
//     if(err) throw err;
//     console.log("Insert complete");
//   });
});