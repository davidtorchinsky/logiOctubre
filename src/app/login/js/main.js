


(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})
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
	  	  


(jQuery);