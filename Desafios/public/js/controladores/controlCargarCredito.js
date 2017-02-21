angular.module('cargarCredito.controllers', ['ngCordova'])
.controller('CargarCreditoCtrl', function($scope,$timeout,$ionicPopup,$state,servicioCreditos,servicioUsuarios,$cordovaBarcodeScanner) 
{
	$scope.banderila = true;
	
	$timeout(function()
	{
		$scope.banderila = false;
	}, 3000);        
	
	$scope.UsuarioLogueado=firebase.auth().currentUser;
	
	var id = $scope.UsuarioLogueado.uid;
	
	$scope.ListadoCreditos={};
	
	$scope.carga = {};
	
	$scope.usuario = {};
	
	$scope.credito = {};

    servicioCreditos.TraerTodos().then(function(respuesta)
	{
		$scope.ListadoCreditos=respuesta;
	},function(error)
	{
		console.log(error);
	});

	servicioUsuarios.BuscarPorId(id).then(function(respuesta)
	{
		$scope.usuario = respuesta;
    },function(error)
	{
		console.log(error);
	});

	$scope.Escanear=function()
	{
		try
		{
			document.addEventListener("deviceready", function () 
			{
				$cordovaBarcodeScanner.scan().then(function(barcodeData) 
				{
					if(barcodeData.text!="")
					{
						servicioCreditos.BuscarPorId(barcodeData.text).then(function(respuesta)
						{
							$scope.credito=respuesta;
							
							$scope.usuario.credito += parseInt($scope.credito.valor);
							
							servicioUsuarios.Modificar($scope.usuario); 
    
							$ionicPopup.alert
							({
								title: 'Crédito cargado exitosamente!!',
								
								okType: 'button-dark'
							});
							
							$state.go('app.perfil');
						}); 
					}
				}, function(error) 
				{
					console.log(error);
				});
			}, false);
		}
		
		catch(err)
		{
			console.log("Los plugins funcionan sólo en celulares!!");
		}
	}	
});