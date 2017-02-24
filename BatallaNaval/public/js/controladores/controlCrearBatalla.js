angular.module('crearBatalla.controllers', ['ngCordova'])
.controller('CrearBatallaCtrl', function($scope, $ionicPopup, servicioUsuarios, $state, servicioBatallas, $timeout, $cordovaVibration, $cordovaNativeAudio) {
	
	$scope.banderula = true;
	
	$timeout(function()
	{
		$scope.banderula = false;
	}, 3000);    
	
	$scope.usuario = {};
	
	$scope.batalla = {};
	
	$scope.batalla.creador = firebase.auth().currentUser.uid;
	
	$scope.batalla.disponible=true;
	
	$scope.batalla.valor=0;
	
	$scope.batalla.posicionCorrecta = "Ninguna";
	
	$scope.batalla.posicionElegida = "Ninguna";
	
	$scope.Aceptar=function()
	{
		try
		{
			$cordovaVibration.vibrate(50);
		}
		
		catch(e)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
		}
		
		var fechaFin;
		
		if($scope.batalla.posicionCorrecta == "Ninguna")
		{
			$ionicPopup.alert
			({
				title: 'Aún no se ha definido una posición!!',
				
				okType: 'button-assertive'
			});
			
			try
			{
				$cordovaNativeAudio.play('Bad');
			}
		
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
			}
			
			return false;
		}
		
		else
		{

			var id = firebase.auth().currentUser.uid;
			
			servicioUsuarios.BuscarPorId(id).then(function(respuesta)
			{
				$scope.usuario=respuesta;
				
				if($scope.usuario.credito < $scope.batalla.valor)
				{		
					$ionicPopup.alert
					({
						title: 'Saldo insuficiente para crear la batalla..',
						
						okType: 'button-assertive'
					});
					
					try
					{
						$cordovaNativeAudio.play('Bad');
					}
			
					catch(e)
					{
						console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
					}
					
					return;
				}
				
				else
				{	
					$ionicPopup.alert
					({
						title: 'Batalla creada exitosamente!!',
						
						okType: 'button-balanced'
					});
					
					try
					{
						$cordovaNativeAudio.play('Good');
					}
			
					catch(e)
					{
						console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
					}
				}
				
				$scope.usuario.credito -= $scope.batalla.valor;
				
				servicioUsuarios.Modificar($scope.usuario);
				
				servicioBatallas.Agregar($scope.batalla);
			},function(error)
			{
				console.log(error);
			});
		}

		
		
			
		
    }
	
	$scope.leerPosicion = function(posicion)
	{
		$scope.batalla.posicionCorrecta = posicion;
	}
});