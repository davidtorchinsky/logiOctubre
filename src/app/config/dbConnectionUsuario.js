const mysql = require('mysql');//se conecta a la bd

module.exports=()=> {
	return mysql.createConnection({
		//host: 'direccion ip del servidor'
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'logistica_medicamentos',//bd usuario
		port: 3306
	})
}