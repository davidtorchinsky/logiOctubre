const dbConnection =require('../../config/dbConnectionUsuario');//aca digo donde tengo que ir a buscar la bd

module.exports=app =>{	
	const connection=dbConnection();//aca tengo la conexion a la bd
	
	app.get('/', (req, res)=>{	
		//console.log("Entre...")
		//console.log(connection);
		connection.query('SELECT * FROM logistica_medicamentos.cliente', (err, result)=>{//colocar la ruta a la coneccion a la bd usuarios
			//console.log("Lo que recibi es....");			
		});
	});
	
	
	app.post('/login', (req, res) => {
		
		console.log(req.body); //recibo los elementos
	    const { Usuario, Contraseña } = req.body;  
	    //verificar que concidan usuario y contraseña
	    //si coninciden redirecciono a src/app/login/barra/barra.component.html
	    //en caso contrario notificar que la contraseña no coincide.
	    
	    
	    
	    //var sql= "INSERT INTO cliente (DireccionCliente,Barrio,FechaDeNacimiento,DniCliente,NombreCliente,ApellidoCliente,TelefonoCliente) 	VALUES("+"'"+DireccionCliente+"'"+','+"'"+Barrio+"'"+','+"'"+FechaDeNacimiento+"'"+','+DniCliente+','+"'"+NombreCliente+"'"+','+"'"+ApellidoCliente+"'"+','+TelefonoCliente+")";//hay que pasar los string a varchar..
	    	
	   /* 	console.log(sql);
	    connection.query(sql,function (err, result) {
	        if (err) res.redirect('/');//si hay error tratarlo
	        else res.redirect('src/app/login/barra/barra.component.html');// si no hay error me quedo
	        console.log(result);
	        console.log(err);
	        console.log("1 record inserted");
	      });*/
	    
	    
		    });
	  }
	  	  
	  