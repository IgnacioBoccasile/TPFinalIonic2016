angular.module('login.controllers', ['ngCordova'])
.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, servicioUsuarios, $cordovaVibration, $cordovaNativeAudio) 
{
	$scope.unabandera = true;
  
	$timeout(function()
	{
		$scope.unabandera = false;
	}, 3000);     
  
	$scope.loginData = {};
	
	$scope.loginData.username = "";
	
	$scope.loginData.password = "";
	
	$scope.Login = function()
	{ 
		try
		{
			$cordovaVibration.vibrate(50);
		}
				
		catch(e)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
		}
		
		$scope.Funciona = false;
		
		$scope.NoFunciona = false;  

		firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).then(function(Respuesta)
		{
			$scope.Funciona = true;
			
			$scope.UsuarioLogueado=firebase.auth().currentUser;
			
			$timeout(function()
			{
				$state.go("app.crearDesafio");
				
				$ionicPopup.alert
				({
					title: 'Bienvenido a "Desafíos"!! ya puede desplazarse libremente por la aplicación!!',
				
					okType: 'button-balanced'
				});	
				
				try
				{
					$cordovaNativeAudio.play('Correcto');
				}
				
				catch(e)
				{
					console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
				}
					
			}, 3000);        
		}).catch(function(Error)
		{
			$scope.NoFunciona = true;
				
			$ionicPopup.alert
			({
				title: 'Error al iniciar sesión, usuario inexistente..',
				
				okType: 'button-assertive'
			});	
			
			try
			{
				$cordovaNativeAudio.play('Incorrecto');
			}
				
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
			}
			
		});
	}
	
	$scope.Acceso = function(correo, clave)
	{
        try
		{
			$cordovaVibration.vibrate(50);
		}
				
		catch(e)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
		}
		
		$scope.loginData.username  = correo;
		
        $scope.loginData.password = clave;
    }
	 
	
	$scope.Registro = function()
	{
		try
		{
			$cordovaVibration.vibrate(50);
		}
				
		catch(e)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
		}
		
		var user = firebase.auth().createUserWithEmailAndPassword($scope.loginData.username,$scope.loginData.password).then(function(respuesta)
		{
			$scope.loginData.username="";
			
			$scope.loginData.password="";
          
			var usuario = {};
			
			usuario.id = respuesta.uid;
			
			usuario.credito = 0;
			
			usuario.nombre = respuesta.email;
          
			servicioUsuarios.Agregar(usuario);
			
			$ionicPopup.alert
			({
				title: 'Usuario registrado exitosamente!!',
				
				okType: 'button-balanced'
			});	
			
			try
			{
				$cordovaNativeAudio.play('Correcto');
			}
				
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
			}
        }).catch(function(error)
		{			
			$ionicPopup.alert
			({
				title: 'Error al registrar, verifique que la clave tenga como mínimo seis caracteres y que el usuario no exista..',
				
				okType: 'button-assertive'
			});	

			try
			{
				$cordovaNativeAudio.play('Incorrecto');
			}
				
			catch(e)
			{
				console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
			}			
        });
	}
});