angular.module('starter', [
'ionic', 
'ngCordova',
'autor.controllers',
'login.controllers',
'menu.controllers',
'usuarios.service'])

.run(function($ionicPlatform, $cordovaNativeAudio) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }	
	
	if(window.plugins && window.plugins.NativeAudio)
	{ 
		$cordovaNativeAudio.preloadComplex('Good', 'audio/Good.wav', 1, 1);
		$cordovaNativeAudio.preloadComplex('Bad', 'audio/Bad.mp3', 1, 1);
		$cordovaNativeAudio.preloadComplex('Coins', 'audio/Coins.mp3', 1, 1);
		$cordovaNativeAudio.preloadComplex('Intro', 'audio/Intro.mp3', 1, 1);
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
  .state('login', 
	{
		url: '/login',
		
		templateUrl: 'templates/login.html',
		
		controller: 'LoginCtrl',
		
		cache: false  
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
    });

  

	$urlRouterProvider.otherwise('/login');
});
