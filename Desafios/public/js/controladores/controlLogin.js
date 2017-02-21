angular.module('login.controllers', [])
.controller('LoginCtrl', function($scope, $ionicModal, $timeout,$state, servicioUsuarios) 
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
		$scope.Funciona = false;
		
		$scope.NoFunciona = false;  

		firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).then(function(Respuesta)
		{
			$scope.Funciona = true;
			
			$scope.UsuarioLogueado=firebase.auth().currentUser;
			
			$timeout(function()
			{
				$state.go("app.crearDesafio");
			}, 3000);        
		}).catch(function(Error)
		{
			$scope.NoFunciona = true;
			
			console.log("Error al iniciar sesión: ", Error);
		});
	}
	
	$scope.Acceso = function(correo, clave)
	{
        $scope.loginData.username  = correo;
		
        $scope.loginData.password = clave;
    }
	
	$scope.Registro = function()
	{
		var user = firebase.auth().createUserWithEmailAndPassword($scope.loginData.username,$scope.loginData.password).then(function(respuesta)
		{
			$scope.loginData.username="";
			
			$scope.loginData.password="";
          
			var usuario = {};
			
			usuario.id = respuesta.uid;
			
			usuario.credito = 0;
			
			usuario.nombre = respuesta.email;
          
			servicioUsuarios.Agregar(usuario);
        }).catch(function(error)
		{
			console.info("Error al registrar usuario: ", error);
        });
	}
});