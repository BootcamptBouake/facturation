 (function () {
     'use strict';
     angular.module('app').controller('factureCtrl', factureCtrl);
     factureCtrl.$inject = ['$scope', '$location', '$http', '$cookieStore'];

     function factureCtrl($scope, $location, $http, $cookieStore) {
         
        $scope.Afficher = true;
        $scope.Voir = false;
        $scope.creer= function(){
            $scope.Afficher = false;
            $scope.Voir = true;
        }
        $scope.listeClient = function () {
          $http.get('/api/listeClient').success(function (data) {
             $scope.personnes = data;
         });
      };
      $scope.listeClient();

      //envoie des info factures
       $scope.creer =function(){
        $http.post('/api/creerfacture',$scope.ajout)
        .success(function(data){
            $scope.ajout = data;

        });
    };
        


     };
     
 })();