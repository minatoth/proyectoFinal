//obtenemos ruta en la que nos encontramos
var path = require("path");

//Se crea el modelo
var Sequelize = require("sequelize");

//Declaramos que haremos uso de sqlite
var sequelize= new Sequelize (null, null, null, {dialect:"sqlite", storage: "agenda.sqlite"});

//importamos la definicion de la tabla que se encuentra en agenda.js
var Contacto =sequelize.import (path.join(__dirname,'agenda'));
exports.Contacto =Contacto; //se exporta la definicion

//sequelize.sync() crea e inicializa la tabla. 
sequelize.sync().success (function(){
	//success ejecuta un manager una vez creada la tabla
   Contacto.count().success(function(count){
   	  //preguntamos si la tabla esta vacia
   	  if(count===0){
   	  	Contacto.create({
   	  		nombres: "Nombre",
			apellidoPaterno: "Paterno",
			apellidoMaterno: "Materno",
			telefonoPersonal: "Telefono Personal",
			telefonoDomicilio: "Telefono Domicilio",
			cumpleaños: new Date()						   
   	  		}).success(function(){
   	  			console.log("Agenda inicializada")
   	  		})
   	  }

   })
})

