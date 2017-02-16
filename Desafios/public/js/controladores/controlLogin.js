angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout,$state, servicioUsuarios) {
	
	$scope.unabandera = true;
  
	$timeout(function(){
          $scope.unabandera = false;
        }, 3000);     
  
	$scope.loginData = {};
	$scope.loginData.username = "jugadoruno@hotmail.com";
	$scope.loginData.password = "123456";
	
	$scope.Login = function()
	{ 
     $scope.Funciona = false;
	 $scope.NoFunciona = false;  

     firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
     .then(function(Respuesta){
        $scope.Funciona = true;
        $scope.UsuarioLogueado=firebase.auth().currentUser;
        console.log($scope.UsuarioLogueado.uid);

        console.log("Respuesta: ", Respuesta);  
    $timeout(function(){
          $state.go("app.autor");
        }, 3000);        
      })
     .catch(function(Error){
          $scope.NoFunciona = true;
          console.log("Error: ", Error);

      });
	}
	
	$scope.Acceso = function(correo, clave)
	{
        $scope.loginData.username  = correo;
        $scope.loginData.password = clave;
    }
	
	$scope.Registro = function()
  {
		var user = firebase.auth().createUserWithEmailAndPassword($scope.loginData.username,$scope.loginData.password).then(function(respuesta){
          console.info("Respuesta: ",respuesta);
          $scope.loginData.username="";
          $scope.loginData.password="";
          
          var usuario = {};
          usuario.id = respuesta.uid;
          usuario.credito = 0;
          usuario.nombre = respuesta.email;
          
          servicioUsuarios.Agregar(usuario);
          console.log("usuario agregado");
    
        })
        .catch(function(error){
          console.info("Error: ",error);
        });

  }
	
});