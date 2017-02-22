angular.module('autor.controllers', [])
.controller('AutorCtrl', function($scope, $timeout) 
{
	$scope.banderita = true;
	
	$timeout(function()
	{
		$scope.banderita = false;
	}, 3000);        
});