angular.module('desafiosDisponibles.controllers', ['ngCordova'])
.controller('DesafiosDisponiblesCtrl', function($scope, $ionicPopup, $timeout,$state, servicioUsuarios, servicioDesafios, $cordovaVibration, $cordovaNativeAudio) 
{
	$scope.bander = true;
	
	$timeout(function()
	{
		$scope.bander = false;
	}, 3000);        
	 
	$scope.datos=[];
	
	$scope.usuario = {};
	
	$scope.DateNow = new Date().getTime();
	
	$scope.userID = firebase.auth().currentUser.uid;

	try
	{
		var refDesafio = firebase.database().ref('Desafios/');
		
		refDesafio.on('child_added', function(snapshot)
		{
			$timeout(function()
			{
				var desafio = snapshot.val();
    
				var id=snapshot.key;
        
				if(!desafio.computado && ((desafio.fechaFin - $scope.DateNow) / 1000)<=0)
				{
					Desafio(desafio, id); 
				}
				
				else
				{
					$scope.datos.push(desafio);
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

	function Desafio(desafio, id)
	{
		if(!desafio.computado && ((desafio.fechaFin - $scope.DateNow) / 1000)<=0)
		{
			if(desafio.jugador == '') 
			{
				servicioUsuarios.BuscarPorId(desafio.creador).then(function(respuesta)
				{
					var usuario=respuesta;
					
					usuario.credito += parseInt(desafio.valor);
					
					servicioUsuarios.Modificar(usuario);
					
					desafio.disponible=false;
					
					desafio.computado=true;
					
					var desf = firebase.database().ref().child('Desafios/' + id);
					
					desf.set( { creador: desafio.creador, 
					
								disponible: false,
								
								computado: true,
								jugador: desafio.jugador,
								
								valor: desafio.valor,
								
								ganador: desafio.creador,
								
								fechaInicio: desafio.fechaInicio,
								
								fechaFin: desafio.fechaFin,
								
								pregunta: desafio.pregunta 
					}, function(error)
					{
						console.log(error); 
                    });          
				})
         
				if(firebase.auth().currentUser.uid == desafio.creador)
				{
					$ionicPopup.alert
					({
						title: 'Nadie aceptó su desafío, se le reintegra a usted el monto apostado..',
						
						okType: 'button-assertive'
					});
					
					try
					{
						$cordovaNativeAudio.play('Nadie');
					}
		
					catch(e)
					{
						console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
					}
				}
			}
			
			else
			{
				if(desafio.jugador)
				{
					if(firebase.auth().currentUser.uid == desafio.creador)
					{
						var confirmPopup = $ionicPopup.confirm
						({
							title: 'Tiempo del desafío terminado: presione "OK" si ha ganado el otro jugador, o "Cancel" si el ganador fue usted',
							
							okType: 'button-balanced',
							
							cancelType: 'button-positive'
						});

						confirmPopup.then(function(res) 
						{
							if(res) 
							{
								servicioUsuarios.BuscarPorId(desafio.jugador).then(function(respuesta)
								{
									if(firebase.auth().currentUser.uid == desafio.jugador)
									{
										$ionicPopup.alert
										({
											title: 'Felicitaciones!! Usted ha ganado el desafío :)',
											
											okType: 'button-balanced'
										});
										
										try
										{
											$cordovaNativeAudio.play('Gana');
										}
							
										catch(e)
										{
											console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
										}
									}
									
									if(firebase.auth().currentUser.uid != desafio.jugador)
									{
										$ionicPopup.alert
										({
											title: 'Suerte para la próxima!! Usted ha perdido el desafío :(',
										
											okType: 'button-assertive'
										});
									
										try
										{
											$cordovaNativeAudio.play('Pierde');
										}
							
										catch(e)
										{
											console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
										}
									}
									
									
									var usuario=respuesta;
									
									usuario.credito += (parseInt(desafio.valor) * 2);
									
									servicioUsuarios.Modificar(usuario);
									
									var desf = firebase.database().ref().child('Desafios/' + id);
									
									desf.set( { creador: desafio.creador,
									
												disponible: false,
												
												computado: true,
												
												jugador: desafio.jugador,
												
												valor: desafio.valor,
												
												ganador : desafio.jugador,
												
												fechaInicio: desafio.fechaInicio,
												
												fechaFin: desafio.fechaFin,
												
												pregunta: desafio.pregunta 
									}, function(error)
									{
										console.log(error); 
									});           
								})
							} 
							
							else 
							{
								servicioUsuarios.BuscarPorId(desafio.creador).then(function(respuesta)
								{              
									if(firebase.auth().currentUser.uid == desafio.creador)
									{
										$ionicPopup.alert
										({
											title: 'Felicitaciones!! Usted ha ganado el desafío :)',
											
											okType: 'button-balanced'
										});
										
										try
										{
											$cordovaNativeAudio.play('Gana');
										}
							
										catch(e)
										{
											console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
										}
									}
									
									if(firebase.auth().currentUser.uid != desafio.creador)
									{
										$ionicPopup.alert
										({
											title: 'Suerte para la próxima!! Usted ha perdido el desafío :(',
										
											okType: 'button-assertive'
										});
									
										try
										{
											$cordovaNativeAudio.play('Pierde');
										}
							
										catch(e)
										{
											console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
										}
									}
									
									var usuario=respuesta;
									
									usuario.credito += (parseInt(desafio.valor)*2);
									
									servicioUsuarios.Modificar(usuario);
									
									var desf = firebase.database().ref().child('Desafios/' + id);
									
									desf.set( { creador: desafio.creador, 
									
												disponible: false,
												
												computado: true,
												
												jugador: desafio.jugador,
												
												valor: desafio.valor,
												
												ganador: desafio.creador,
												
												fechaInicio: desafio.fechaInicio,
												
												fechaFin: desafio.fechaFin,
												
												pregunta: desafio.pregunta 
									}, function(error)
									{
										console.log(error); 
									}); 
								})
							}
						})
					}
				}
			}
		}
	}

    $scope.verDesafio = function(index)
	{
		try
		{
			$cordovaVibration.vibrate(50);
		}
		
		catch(e)
		{
			console.log("Vibration, NativeAudio y BarcodeScanner únicamente en celulares!!");
		}
		
		$state.go('app.aceptarDesafio', {desafio:index});
	}
});