const mysql = require('mysql');//se conecta a la bd

module.exports=()=> {
	return mysql.createConnection({
		//host: 'direccion ip del servidor'
		host: 'localhost',
		user: 'root',
		password: '123',
		database: 'logistica_medicamentos',
		port: 3306
	})
}