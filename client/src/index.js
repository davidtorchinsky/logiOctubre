const app = require('./app/config-bd/medicoServer');

require ('./app/consultas/medicoConsultas')(app);
//inicia el servidor

app.listen(app.get('port'),() =>{
	console.log('server en el puerto ', app.get('port'));
});