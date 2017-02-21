'use strict';
angular.module('creditos.service', ["firebase"])
.service('servicioCreditos', ["$firebaseArray", function($firebaseArray)
{          
	this.ref = firebase.database().ref('Creditos/');
	
	this.arrayCreditos = $firebaseArray(this.ref);
 
	this.TraerTodos = function()
	{
		return this.arrayCreditos.$loaded().then(function(datos)
		{
			return datos;
		})
	};
		
	this.BuscarPorId = function(id)
	{
		return this.arrayCreditos.$loaded().then(function(datos)
		{
			return datos.$getRecord(id);
		})
	};
}])
;