angular.module('batallasCreadas.controllers', ['ngCordova'])
.controller('BatallasCreadasCtrl', function($scope, $ionicModal,$timeout,$state,servicioBatallas,servicioUsuarios) 
{
	$scope.bande = true;
	
	$timeout(function()
	{
		$scope.bande = false;
	}, 3000); 
	
	$scope.userID = firebase.auth().currentUser.uid;
	
	$scope.DateNow = new Date().getTime();
	
	$scope.datos=[];
	
	try
	{
		var refBatalla = firebase.database().ref('Batallas/');
		
		refBatalla.on('child_added', function(snapshot)
		{
			$timeout(function()
			{
				var batalla = snapshot.val();
				
				var id=snapshot.key;
				
				$scope.datos.push(batalla); 
			});
		}); 
	}
	
	catch(err)
	{
		$ionicPopup.alert
		({
			title: 'Por favor, revise su conexión..',
			
			okType: 'button-dark',
		});
	}
});