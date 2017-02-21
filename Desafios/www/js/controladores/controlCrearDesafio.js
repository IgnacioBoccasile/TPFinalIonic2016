angular.module('crearDesafio.controllers', [])
.controller('CrearDesafioCtrl', function($scope, $ionicPopup, servicioUsuarios, $state, servicioDesafios, $timeout) 
{	
    $scope.banderula = true;
	
	$timeout(function()
	{
		$scope.banderula = false;
	}, 3000);    
	
	$scope.usuario = {};
	
	$scope.desafio = {};
	
	$scope.desafio.creador = firebase.auth().currentUser.uid;
	
	$scope.desafio.disponible=true;
	
	$scope.desafio.computado=false;
	
	$scope.desafio.jugador="";
	
	$scope.desafio.valor=0;
	
	$scope.desafio.pregunta = "";
	
	$scope.desafio.ganador = "";
	
    $scope.tiempo = { dias: 0, horas: 0, minutos: 0, segundos: 0 };

	$scope.Aceptar=function()
	{
		var fechaFin;
		
		if($scope.tiempo.dias == 0 && $scope.tiempo.horas == 0 && $scope.tiempo.minutos == 0 && $scope.tiempo.segundos == 0)
		{
			$ionicPopup.alert
			({
				title: 'Aún no se ha definido el tiempo!!',
				
				okType: 'button-dark'
			});
			
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

		$scope.desafio.fechaInicio = new Date().getTime(); 
		
		$scope.desafio.fechaFin = fechaFin.getTime();

		var id = firebase.auth().currentUser.uid;
		
		servicioUsuarios.BuscarPorId(id).then(function(respuesta)
		{
			$scope.usuario=respuesta;
			
			if($scope.usuario.credito < $scope.desafio.valor)
			{
				$ionicPopup.alert
				({
					title: 'Saldo insuficiente para crear su desafío..',
					
					okType: 'button-dark'
				});
				
				return;
			}
			
			$scope.usuario.credito -= $scope.desafio.valor;
			
			servicioUsuarios.Modificar($scope.usuario);
			
			servicioDesafios.Agregar($scope.desafio);
		},function(error)
		{
			console.log(error);
		});

		$state.go('app.desafiosCreados');
    }
});