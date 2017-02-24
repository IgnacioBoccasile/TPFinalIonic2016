angular.module('batallasDisponibles.controllers', ['ngCordova'])
.controller('BatallasDisponiblesCtrl', function($scope, $ionicPopup, $timeout, $state, $cordovaVibration, servicioUsuarios) 
{
	$scope.bander = true;
	
	$scope.credito;
	
	$timeout(function()
	{
		$scope.bander = false;
	}, 3000);        
	
	$scope.datos=[];
	
	$scope.userID = firebase.auth().currentUser.uid;
	
	servicioUsuarios.BuscarPorId($scope.userID).then(function(respuesta)
	{
		var usuario=respuesta;
		$scope.credito = usuario.credito;
	}, function(error)
	{
		console.log(error); 
	})         

	try
	{
		var refBatalla = firebase.database().ref('Batallas/');
		
		refBatalla.on('child_added', function(snapshot)
		{
			$timeout(function()
			{
				var batalla = snapshot.val();
    
				var id=snapshot.key;
        
				if(batalla.creador != $scope.userID)
				{
					$scope.datos.push(batalla);	
				}					 
			});
		}); 
	}
	
	catch(err)
	{
		$ionicPopup.alert
		({
			title: 'Por favor, revise su conexión..',
			
            okType: 'button-assertive'
		});
	}
	
	$scope.jugar = function()
	{
		try
		{
			$cordovaVibration.vibrate(50);
		}
		
		catch(Exception)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
		}
	}
});