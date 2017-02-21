angular.module('menu.controllers', [])
.controller('MenuCtrl', function($scope, $state) 
{
	$scope.UsuarioLogueado=firebase.auth().currentUser;

	$scope.Logout = function()
	{
		firebase.auth().signOut().catch(function(Error)
		{
			console.log("Error al cerrar sesión: ", Error);
		}).then(function(Respuesta)
		{
			$state.go("login");
		});
	}
});
