angular.module('starter', [
'ionic', 
'timer',
'ngCordova',
'autor.controllers', 
'login.controllers', 
'menu.controllers', 
'perfil.controllers',
'cargarCredito.controllers',
'crearDesafio.controllers',
'desafiosCreados.controllers',
'desafiosDisponibles.controllers',
'aceptarDesafio.controllers',
'usuarios.service',
'creditos.service',
'desafios.service'])

.run(function($ionicPlatform, $cordovaNativeAudio) 
{
	$ionicPlatform.ready(function() 
	{
		if(window.cordova && window.cordova.plugins.Keyboard) 
		{
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			
			cordova.plugins.Keyboard.disableScroll(true);
		}
		
		if (window.StatusBar) 
		{
			StatusBar.styleDefault();
		}
		
		if(window.plugins && window.plugins.NativeAudio)
		{ 
			$cordovaNativeAudio.preloadComplex('Correcto', 'audio/Correcto.mp3', 1, 1);
			$cordovaNativeAudio.preloadComplex('Incorrecto', 'audio/Incorrecto.mp3', 1, 1);
			$cordovaNativeAudio.preloadComplex('Moneda', 'audio/Moneda.mp3', 1, 1);
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) 
{
	$stateProvider

    .state('app', 
	{
		url: '/app',
		
		abstract: true,
		
		templateUrl: 'templates/menu.html',
		
		controller: 'MenuCtrl'
	})
	
	.state('app.cargarCredito', 
	{
		url: '/cargarCredito',
		
		views: 
		{
			'menuContent': 
			{
				templateUrl: 'templates/cargarCredito.html',
				
				controller: 'CargarCreditoCtrl'
			}
		}
	})
  
	.state('app.crearDesafio', 
	{
		url: '/crearDesafio',
		
		views: 
		{
			'menuContent': 
			{
				templateUrl: 'templates/crearDesafio.html',
				
				controller: 'CrearDesafioCtrl'
			}
		}
	})
  
	.state('app.desafiosCreados', 
	{
		url: '/desafiosCreados',
		
		views: 
		{
			'menuContent': 
			{
				templateUrl: 'templates/desafiosCreados.html',
				
				controller: 'DesafiosCreadosCtrl'
			}
		}
	})
  
	.state('app.desafiosDisponibles', 
	{
		url: '/desafiosDisponibles',
		
		views: 
		{
			'menuContent': 
			{
				templateUrl: 'templates/desafiosDisponibles.html',
				
				controller: 'DesafiosDisponiblesCtrl'
			}
		}
	})
  
	.state('app.aceptarDesafio', 
	{
		url: '/desafioAceptar/:desafio',
		
		views: 
		{
			'menuContent': 
			{
				templateUrl: 'templates/aceptarDesafio.html',
				
				controller:'AceptarDesafioCtrl'
			}
		}
	})
  
	.state('login', 
	{
		url: '/login',
		
		templateUrl: 'templates/login.html',
		
		controller: 'LoginCtrl',
		
		cache: false  
	})

	.state('app.perfil', 
	{
		url: '/perfil',
		
		views: 
		{
			'menuContent': 
			{
				templateUrl: 'templates/perfil.html',
				
				controller: 'PerfilCtrl'
			}
		}
    })
	
    .state('app.autor', 
	{
		url: '/autor',
		
		views: 
		{
			'menuContent': 
			{
				templateUrl: 'templates/autor.html',
				
			controller: 'AutorCtrl'
			}
		}
    })

	$urlRouterProvider.otherwise('/login');
});