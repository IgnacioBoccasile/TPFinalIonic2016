'use strict';
angular.module('usuarios.service', ["firebase"])

    .service('servicioUsuarios', ["$firebaseArray", 
        function($firebaseArray){
            
            this.ref = firebase.database().ref('Usuarios/');
            this.arrayUsuarios = $firebaseArray(this.ref);
         
            this.Agregar = function(usuario){
                    var refUsuarios = firebase.database().ref().child('Usuarios/' + usuario.id);
                    refUsuarios.set( { credito: usuario.credito, nombre: usuario.nombre }, function(error){
                        if (error)
                            console.log("Error al guardar: " + error)
                        else
                            console.log("El usuario de ID: " +usuario.id + " fue agregado exitosamente!!"); 
                    });
                };
				
				this.BuscarPorId = function(id){
                    return this.arrayUsuarios.$loaded().then(function(datos){
                        return datos.$getRecord(id);
                    })
                };
        }])
;