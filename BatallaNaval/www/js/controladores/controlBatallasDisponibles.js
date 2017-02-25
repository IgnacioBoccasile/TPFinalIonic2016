angular.module('batallasDisponibles.controllers', ['ngCordova'])
.controller('BatallasDisponiblesCtrl', function($scope, $ionicPopup, $timeout,$state, servicioUsuarios, servicioBatallas, $cordovaVibration, $cordovaNativeAudio) 
{
	$scope.bander = true;
	
	$timeout(function()
	{
		$scope.bander = false;
	}, 3000);        
	 
	$scope.datos=[];
	
	$scope.usuario = {};
	
	$scope.credito = 0;
	
	$scope.DateNow = new Date().getTime();
	
	$scope.userID = firebase.auth().currentUser.uid;
	
	var id = firebase.auth().currentUser.uid;
	
	servicioUsuarios.BuscarPorId(id).then(function(respuesta)
	{
		$scope.usuario=respuesta;
		
		if($scope.usuario)
		{
			$scope.credito = $scope.usuario.credito;
		}  
	},function(error)
	{
		console.log(error);
	});

	try
	{
		var refBatalla = firebase.database().ref('Batallas/');
		
		refBatalla.on('child_added', function(snapshot)
		{
			$timeout(function()
			{
				var batalla = snapshot.val();
    
				var id=snapshot.key;
        
				if(!batalla.computada && ((batalla.fechaFin - $scope.DateNow) / 1000)<=0)
				{
					Batalla(batalla, id); 
				}
				
				else
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

	function Batalla(batalla, id)
	{
		if(!batalla.computada && ((batalla.fechaFin - $scope.DateNow) / 1000)<=0)
		{
			if(batalla.jugador == '') 
			{
				servicioUsuarios.BuscarPorId(batalla.creador).then(function(respuesta)
				{
					var usuario=respuesta;
					
					usuario.credito += parseInt(batalla.valor);
					
					servicioUsuarios.Modificar(usuario);
					
					batalla.disponible=false;
					
					batalla.computada=true;
					
					var desf = firebase.database().ref().child('Batallas/' + id);
					
					desf.set( { creador: batalla.creador, 
					
								disponible: false,
								
								computada: true,
								jugador: batalla.jugador,
								
								valor: batalla.valor,
								
								ganador: batalla.creador,
								
								fechaInicio: batalla.fechaInicio,
								
								fechaFin: batalla.fechaFin,
								
								posicionCorrecta: batalla.posicionCorrecta,
								
								posicionElegida: batalla.posicionElegida
					}, function(error)
					{
						console.log(error); 
                    });          
				})
         
				if(firebase.auth().currentUser.uid == batalla.creador)
				{
					$ionicPopup.alert
					({
						title: 'Nadie ha jugado la batalla, se le reintegra a usted el monto apostado..',
						
						okType: 'button-assertive'
					});
					
					try
					{
						$cordovaNativeAudio.play('Bad');
					}
		
					catch(e)
					{
						console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
					}
				}
			}
			
			else
			{
				if(batalla.jugador)
				{
					if(firebase.auth().currentUser.uid == batalla.creador)
					{
						servicioUsuarios.BuscarPorId(batalla.creador).then(function(respuesta)
						{
							if(batalla.posicionElegida != batalla.posicionCorrecta)
							{
								$ionicPopup.alert
								({
									title: 'Felicitaciones!! Su oponente no ha podido hundir su nave :)',
									
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
								
								var usuario=respuesta;
							
							usuario.credito += (parseInt(batalla.valor) * 2);
							
							servicioUsuarios.Modificar(usuario);
							
							var desf = firebase.database().ref().child('Batallas/' + id);
							
							desf.set( { creador: batalla.creador,
							
										disponible: false,
										
										computada: true,
										
										jugador: batalla.jugador,
										
										valor: batalla.valor,
										
										ganador : batalla.jugador,
										
										fechaInicio: batalla.fechaInicio,
										
										fechaFin: batalla.fechaFin,
										
										posicionCorrecta: batalla.posicionCorrecta,
										
										posicionElegida: batalla.posicionElegida
							}, function(error)
							{
								console.log(error); 
							}); 
							}
							
							if((batalla.posicionElegida != "Ninguna") && (batalla.posicionElegida == batalla.posicionCorrecta))
							{
								$ionicPopup.alert
								({
									title: 'Mala suerte!! Su oponente ha hundido su nave :(',
								
									okType: 'button-assertive'
								});
							
								try
								{
									$cordovaNativeAudio.play('Bad');
								}
					
								catch(e)
								{
									console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
								}
								
								servicioUsuarios.BuscarPorId(batalla.jugador).then(function(r)
								{
									var user = r;
									
									user.credito += (parseInt(batalla.valor) * 2);
							
									servicioUsuarios.Modificar(user);	
								})
								
								var usuario=respuesta;
							
							var desf = firebase.database().ref().child('Batallas/' + id);
							
							desf.set( { creador: batalla.creador,
							
										disponible: false,
										
										computada: true,
										
										jugador: batalla.jugador,
										
										valor: batalla.valor,
										
										ganador : batalla.jugador,
										
										fechaInicio: batalla.fechaInicio,
										
										fechaFin: batalla.fechaFin,
										
										posicionCorrecta: batalla.posicionCorrecta,
										
										posicionElegida: batalla.posicionElegida
							}, function(error)
							{
								console.log(error); 
							}); 
							}		
							          
						})
							 		
						
					}
				}
			}
		}
	}

    $scope.verBatalla = function(index)
	{
		try
		{
			$cordovaVibration.vibrate(50);
		}
		
		catch(e)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner en celulares!!");
		}
		
		$state.go('app.jugarBatalla', {batalla:index});
	}
});