angular.module('starter', [
'ionic', 
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

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('app.cargarCredito', {
    url: '/cargarCredito',
    views: {
      'menuContent': {
        templateUrl: 'templates/cargarCredito.html',
		controller: 'CargarCreditoCtrl'
      }
    }
  })
  
  .state('app.crearDesafio', {
    url: '/crearDesafio',
    views: {
      'menuContent': {
        templateUrl: 'templates/crearDesafio.html',
		controller: 'CrearDesafioCtrl'
      }
    }
  })
  
  .state('app.desafiosCreados', {
    url: '/desafiosCreados',
    views: {
      'menuContent': {
        templateUrl: 'templates/desafiosCreados.html',
		controller: 'DesafiosCreadosCtrl'
      }
    }
  })
  
  .state('app.desafiosDisponibles', {
    url: '/desafiosDisponibles',
    views: {
      'menuContent': {
        templateUrl: 'templates/desafiosDisponibles.html',
		controller: 'DesafiosDisponiblesCtrl'
      }
    }
  })
  
  .state('app.aceptarDesafio', {
    url: '/desafioAceptar/:desafio',
    views: {
      'menuContent': {
        templateUrl: 'templates/aceptarDesafio.html',
        controller:'AceptarDesafioCtrl'
      }
    }
  })
  
  .state('login', {
	  url: '/login',
	  templateUrl: 'templates/login.html',
	  controller: 'LoginCtrl',
	cache: false
		  
	  
  })

  .state('app.perfil', {
      url: '/perfil',
      views: {
        'menuContent': {
          templateUrl: 'templates/perfil.html',
		  controller: 'PerfilCtrl'
        }
      }
    })
    .state('app.autor', {
      url: '/autor',
      views: {
        'menuContent': {
          templateUrl: 'templates/autor.html',
          controller: 'AutorCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
