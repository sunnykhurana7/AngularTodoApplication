(function () {
    'use strict';

    angular
        .module("myApp")
        .controller("todoController",todoController);

        todoController.$inject = ["todoProcessor"]
    
        function todoController(todoProcessor) {

            var vm = this;

            todoProcessor.getTodos()
                .then(function (data) {
                    vm.completebefore = data.completebefore;
                    vm.incompletebefore = data.incompletebefore;
                    vm.completeafter = data.completeafter;
                    vm.incompleteafter = data.incompleteafter;
                })
            
        }

})();