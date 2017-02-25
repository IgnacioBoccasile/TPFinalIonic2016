angular.module('jugarBatalla.controllers', ['ngCordova'])
.controller('JugarBatallaCtrl', function($scope, $stateParams,$ionicPopup, $timeout,$state, servicioUsuarios, servicioBatallas, $cordovaVibration, $cordovaNativeAudio) 
{
	$scope.laPosicion = "Ninguna";
	
	$scope.bandi = true;
	
	$timeout(function()
	{
		$scope.bandi = false;
	}, 3000); 
				
	var index = $stateParams.batalla;

	$scope.usuario = {};
	
	$scope.credito=0;

	servicioBatallas.BuscarPorIndex(index).then(function(respuesta)
	{
		$scope.batalla=respuesta;

		if($scope.batalla.jugador != "" && $scope.batalla.jugador != $scope.usuario.$id)
		{
			$ionicPopup.alert
			({
				title: 'La batalla ya fue jugada!!',
				
				okType: 'button-assertive'
			});
			
			try
			{
				$cordovaNativeAudio.play('Bad');
			}
		
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
			}
			
			$state.go('app.batallasDisponibles');
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

	$scope.JugarBatalla=function()
	{
		try
		{
			$cordovaVibration.vibrate(50);
		}
		
		catch(e)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
		}
		
		$scope.batalla.jugador = $scope.usuario.$id;
		
		if($scope.usuario.credito < $scope.batalla.valor)
		{
			$ionicPopup.alert
			({
				title: 'Saldo insuficiente para jugar la batalla..',
				
				okType: 'button-assertive'
			});
			
			try
			{
				$cordovaNativeAudio.play('Bad');
			}
		
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
			}
			
			return;
		}
		
		else if($scope.laPosicion == "Ninguna")
		{	
			$ionicPopup.alert
			({
				title: 'No se ha definido donde atacar la nave enemiga!!',
				
				okType: 'button-assertive'
			});
			
			try
			{
				$cordovaNativeAudio.play('Bad');
			}
		
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
			}
			
			return false;	
		}

		else
		{
			$scope.usuario.credito -= $scope.batalla.valor;
			
			$scope.batalla.posicionElegida = $scope.laPosicion;
			
			servicioUsuarios.Modificar($scope.usuario);
			
			servicioBatallas.Modificar($scope.batalla);
			
			$ionicPopup.alert
			({
				title: 'Estupendo!! Espere a que finalice el tiempo para ver los resultados de su apuesta!!',
				
				okType: 'button-positive'
			});
			
			try
			{
				$cordovaNativeAudio.play('Coins');
			}
		
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
			}
     
			$state.go('app.batallasDisponibles');
		}
	}
	
	$scope.leerPosicion = function(posicion)
	{
		$scope.laPosicion = posicion;
	}
});