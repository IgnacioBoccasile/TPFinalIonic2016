'use strict';
angular.module('batallas.service', ["firebase"])
.service('servicioBatallas', ["$firebaseArray", function($firebaseArray)
{     
	this.ref = firebase.database().ref('Batallas/');
	
	this.arrayBatallas = $firebaseArray(this.ref);
	
	this.TraerTodos = function()
	{
		return this.arrayBatallas.$loaded().then(function(datos)
		{
			return datos;
		})
	};

	this.Agregar = function(batalla)
	{
		this.arrayBatallas.$add(batalla).then(function(ref)
		{
			var id = ref.key;
		})
	};
	
	this.BuscarPorIndex = function(index)
	{
		return this.arrayBatallas.$loaded().then(function(datos)
		{
			return datos[index];
		})
	};

	this.Modificar = function(index)
	{
		this.arrayBatallas.$save(index).then(function(ref)
		{
			var id = ref.key;
		})
	};
}])
;