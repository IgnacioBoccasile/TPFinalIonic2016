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
	
	$scope.batalla.computada = false;
	
	$scope.batalla.valor=0;
	
	$scope.batalla.jugador = "";
	
	$scope.batalla.ganador = "";
	
	$scope.batalla.posicionCorrecta = "Ninguna";
	
	$scope.batalla.posicionElegida = "Ninguna";
	
	$scope.tiempo = { dias: 0, horas: 0, minutos: 0, segundos: 0 };
	
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
		
		if($scope.tiempo.dias == 0 && $scope.tiempo.horas == 0 && $scope.tiempo.minutos == 0 && $scope.tiempo.segundos == 0)
		{
			$ionicPopup.alert
			({
				title: 'Aún no se ha definido el tiempo!!',
				
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
			fechaFin = new Date();
			
			if($scope.tiempo.dias != 0)
			{
				fechaFin.setDate(fechaFin.getDate() + parseInt($scope.tiempo.dias));
			}
          
			if ($scope.tiempo.horas != 0)
			{
				fechaFin.setHours(fechaFin.getHours() + parseInt($scope.tiempo.horas));
			}
          
			if ($scope.tiempo.minutos != 0)
			{
				fechaFin.setMinutes(fechaFin.getMinutes() + parseInt($scope.tiempo.minutos));
			}
          
			if ($scope.tiempo.segundos != 0)
			{
				fechaFin.setSeconds(fechaFin.getSeconds() + parseInt($scope.tiempo.segundos));
			}
		}
		
		$scope.batalla.fechaInicio = new Date().getTime(); 
		
		$scope.batalla.fechaFin = fechaFin.getTime();
		
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
						
						okType: 'button-positive'
					});
					
					try
					{
						$cordovaNativeAudio.play('Good');
					}
			
					catch(e)
					{
						console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
					}
					
					$scope.usuario.credito -= $scope.batalla.valor;
				
					servicioUsuarios.Modificar($scope.usuario);
				
					servicioBatallas.Agregar($scope.batalla);
					
					$state.go('app.batallasCreadas');
				}
				
				
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