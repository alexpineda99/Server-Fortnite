const mysql = require('mysql');
//Server
// module.exports  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'bedtos3chjkx87gmokkt-mysql.services.clever-cloud.com',
//   user            : 'uzkwksd9p1duj5fe',
//   password        : 'gnKR97r0iR4ezAE5Ioxj',
//   database        : 'bedtos3chjkx87gmokkt'
// });

//Local
module.exports  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'pagina_fortnite'
});