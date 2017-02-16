angular.module('perfil.controllers', [])

.controller('PerfilCtrl', function($scope, servicioUsuarios, $timeout) {
	
	$scope.banderola = true;
	
	$timeout(function(){
		 			$scope.banderola = false;
		 		}, 3000);      
	
	$scope.UsuarioLogueado=firebase.auth().currentUser;
	var idUsuario = $scope.UsuarioLogueado.uid

	servicioUsuarios.BuscarPorId(idUsuario).then(function(respuesta){
  		console.log(respuesta);
  		$scope.usuario = respuesta;

  	}, function(error) {
            console.log(error);
    });
	
});