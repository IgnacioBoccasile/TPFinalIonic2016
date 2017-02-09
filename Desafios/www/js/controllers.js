angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})



.controller('AutorCtrl', function($scope, $timeout) {
	 $scope.banderita = true;
	
	$timeout(function(){
		 			$scope.banderita = false;
		 		}, 3000);        
});
