angular.module('aceptarDesafio.controllers', [])
.controller('AceptarDesafioCtrl', function($scope, $stateParams,$ionicPopup, $timeout,$state, servicioUsuarios, servicioDesafios) 
{
	$scope.bandi = true;
	
	$timeout(function()
	{
		$scope.bandi = false;
	}, 3000); 
				
	var index = $stateParams.desafio;

	$scope.usuario = {};
	
	$scope.credito=0;

	servicioDesafios.BuscarPorIndex(index).then(function(respuesta)
	{
		$scope.desafio=respuesta;

		if($scope.desafio.jugador != "" && $scope.desafio.jugador != $scope.usuario.$id)
		{
			$ionicPopup.alert
			({
				title: 'El desafío ya fue aceptado!!',
				
				okType: 'button-dark',
			});
			
			$state.go('app.desafiosDisponibles');
		}
	},function(error)
	{
		console.log(error);
	});

	var id = firebase.auth().currentUser.uid;
	
	servicioUsuarios.BuscarPorId(id).then(function(respuesta)
	{
		$scope.usuario=respuesta;
		
		if($scope.usuario)
		{
			$scope.credito = $scope.usuario.credito;
		}  
	},function(error)
	{
		console.log(error);
	});

	$scope.AceptarDesafio=function()
	{
		$scope.desafio.jugador = $scope.usuario.$id;
		
		if($scope.usuario.credito < $scope.desafio.valor)
		{
			$ionicPopup.alert
			({
				title: 'Saldo insuficiente para aceptar el desafío..',
				
				okType: 'button-dark'
			});
			
			return;
		}
		
		else
		{
			$scope.usuario.credito -= $scope.desafio.valor;
			
			servicioUsuarios.Modificar($scope.usuario);
			
			servicioDesafios.Modificar($scope.desafio);
			
			$ionicPopup.alert
			({
				title: 'Desafio aceptado!!',
				okType: 'button-dark'
			});
     
			$state.go('app.desafiosDisponibles');
		}
	}
});