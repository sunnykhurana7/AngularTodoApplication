(function () {
    'use strict';

    angular
        .module("myApp")
        .factory("todoListfactory",todoListfactory);

        todoListfactory.$inject = ["$http"];
        
        function todoListfactory($http) {
            var service = {};
            service.getTodoList = getData;
            return service;
            
            function getData() {
                return $http.get('api/tsconfig.json')
                    .then(function (response) {
                        return response;
                    })
            }
        }

})();