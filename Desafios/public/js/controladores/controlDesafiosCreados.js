angular.module('desafiosCreados.controllers', [])
.controller('DesafiosCreadosCtrl', function($scope,$ionicModal,$timeout,$state,servicioDesafios,servicioUsuarios)
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
		var refDesafio = firebase.database().ref('Desafios/');
		
		refDesafio.on('child_added', function(snapshot)
		{
			$timeout(function()
			{
				var desafio = snapshot.val();
				
				var id=snapshot.key;
				
				$scope.datos.push(desafio); 
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