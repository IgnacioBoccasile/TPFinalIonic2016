'use strict';
angular.module('usuarios.service', ["firebase"])

    .service('servicioUsuarios', ["$firebaseArray", 
        function($firebaseArray){
            
            this.ref = firebase.database().ref('Usuarios/');
            this.arrayUsuarios = $firebaseArray(this.ref);
			
			
           this.TraerTodos= function(){
                    return this.arrayUsuarios.$loaded().then(function(datos){
                        console.log(datos);
                        return datos;
                    })
                };
         
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
				this.Modificar = function(index){
                    this.arrayUsuarios.$save(index).then(function(ref){
                        var id = ref.key;
                        console.log("El usuario de ID: " + id + " fue modificado exitosamente!!");
                   })
             };
        }])
;